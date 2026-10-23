import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';
import { PRODUCT_IDENTITY, SYSTEM_PROMPT_KNOWLEDGE, FAQ_ITEMS, PRICING_PLANS } from './src/data/productData.js';
import { WorkflowArchitect } from './src/services/workflowArchitect.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Security Headers (compatible with Google AI Studio iframe preview environment)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'microphone=(self), camera=()');
  next();
});

// JSON body parser with strict size limit
app.use(express.json({ limit: '64kb' }));

// In-Memory Rate Limiting for Chat
const chatRateLimits = new Map<string, { count: number; resetTime: number }>();
const CHAT_WINDOW_MS = 60 * 1000;
const MAX_CHAT_PER_MIN = 60;

function isChatRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = chatRateLimits.get(ip);
  if (!entry || now > entry.resetTime) {
    chatRateLimits.set(ip, { count: 1, resetTime: now + CHAT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_CHAT_PER_MIN) {
    return true;
  }
  entry.count += 1;
  return false;
}

// In-Memory WebSocket Connection Limits
const activeWsPerIp = new Map<string, number>();
const wsAttemptsPerIp = new Map<string, { count: number; resetTime: number }>();
const MAX_CONCURRENT_WS = 3;
const MAX_WS_PER_MIN = 15;
const MAX_WS_PAYLOAD_BYTES = 512 * 1024; // 512 KB

function checkWsAllowed(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const active = activeWsPerIp.get(ip) || 0;
  if (active >= MAX_CONCURRENT_WS) {
    return { allowed: false, reason: 'Maximum concurrent voice sessions reached for this IP. Please close another tab.' };
  }

  const attemptEntry = wsAttemptsPerIp.get(ip);
  if (!attemptEntry || now > attemptEntry.resetTime) {
    wsAttemptsPerIp.set(ip, { count: 1, resetTime: now + 60000 });
  } else {
    if (attemptEntry.count >= MAX_WS_PER_MIN) {
      return { allowed: false, reason: 'Too many connection attempts. Please wait a minute before retrying.' };
    }
    attemptEntry.count += 1;
  }

  activeWsPerIp.set(ip, active + 1);
  return { allowed: true };
}

function releaseWsConnection(ip: string) {
  const active = activeWsPerIp.get(ip) || 0;
  if (active <= 1) {
    activeWsPerIp.delete(ip);
  } else {
    activeWsPerIp.set(ip, active - 1);
  }
}

// Periodic cleanup of rate limiting maps
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of chatRateLimits.entries()) {
    if (now > data.resetTime) chatRateLimits.delete(ip);
  }
  for (const [ip, data] of wsAttemptsPerIp.entries()) {
    if (now > data.resetTime) wsAttemptsPerIp.delete(ip);
  }
}, 300000);

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Status & Configuration Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    configured: Boolean(ai),
    hasApiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
    liveModel: 'aiaaji live',
    voice: process.env.GEMINI_VOICE || PRODUCT_IDENTITY.configuredVoiceName,
    chatModel: PRODUCT_IDENTITY.chatModel,
    downloadUrl: process.env.AI_AAJI_DOWNLOAD_URL || PRODUCT_IDENTITY.downloadUrl,
    downloadVersion: PRODUCT_IDENTITY.downloadVersion,
    contactEmail: PRODUCT_IDENTITY.contactEmail,
  });
});

// Chatbot endpoint with Workflow Architect and tool execution
app.post('/api/chat', async (req, res) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (isChatRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending another message.',
    });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message must be a non-empty string' });
  }

  const sanitizedMessage = message.trim();
  if (!sanitizedMessage) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  if (sanitizedMessage.length > 2000) {
    return res.status(400).json({ error: 'Message exceeds maximum length of 2000 characters' });
  }

  // Determine intent & tool using Workflow Architect
  const toolSelection = WorkflowArchitect.selectTool(sanitizedMessage);

  // If Gemini API is available, try model generation with verified tool context
  if (ai) {
    try {
      const selectedTool = toolSelection?.tool;
      const toolOutput = selectedTool ? await selectedTool.execute(toolSelection.args) : null;

      const contextualPrompt = `${SYSTEM_PROMPT_KNOWLEDGE}

Verified Tool Output:
${selectedTool ? `Tool [${selectedTool.name}]: ${JSON.stringify(toolOutput)}` : 'No tool required'}

User Question: ${sanitizedMessage}

Instructions:
Answer as AI Aaji in a warm, friendly, concise, and helpful tone using the verified tool output. Do not invent any pricing, dates, download URLs, or features outside of the verified tool output.`;

      const geminiPromise = ai.models.generateContent({
        model: PRODUCT_IDENTITY.chatModel,
        contents: [
          {
            role: 'user',
            parts: [{ text: contextualPrompt }],
          },
        ],
        config: {
          temperature: 0.6,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini response timed out')), 4500)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const reply = response.text || "Hello! I'm AI Aaji. How can I assist you today?";
      return res.json({
        reply,
        mode: 'workflow-gemini',
        toolUsed: selectedTool?.name,
        toolStatus: selectedTool?.statusMessage,
      });
    } catch (err: any) {
      console.warn('Gemini chat generation timed out or failed, falling back to Workflow Architect execution:', err?.message || err);
    }
  }

  // Fallback to Workflow Architect execution engine
  const workflowResult = await WorkflowArchitect.executeWorkflow(sanitizedMessage);
  return res.json(workflowResult);
});

// WebSocket Server for Gemini Live Realtime Audio Bridge
const wss = new WebSocketServer({ server, path: '/api/live-ws' });

wss.on('connection', async (clientWs: WebSocket, req) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const wsCheck = checkWsAllowed(clientIp);
  if (!wsCheck.allowed) {
    clientWs.send(
      JSON.stringify({
        type: 'error',
        code: 'CONNECTION_LIMIT_EXCEEDED',
        message: wsCheck.reason,
      })
    );
    clientWs.close();
    return;
  }

  let isCleanedUp = false;
  const handleDisconnect = () => {
    if (isCleanedUp) return;
    isCleanedUp = true;
    releaseWsConnection(clientIp);
  };

  console.log('[Live WS] Client connected to live audio bridge from', clientIp);

  if (!ai) {
    clientWs.send(
      JSON.stringify({
        type: 'error',
        code: 'API_KEY_MISSING',
        message:
          'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Google AI Studio Secrets to enable live Gemini Realtime audio streaming.',
      })
    );
    clientWs.close();
    handleDisconnect();
    return;
  }

  const underlyingGeminiModel = process.env.GEMINI_LIVE_MODEL || PRODUCT_IDENTITY.configuredVoiceModel || 'gemini-3.8-live';
  const engineDisplayText = 'aiaaji live';
  const voiceName = process.env.GEMINI_VOICE || PRODUCT_IDENTITY.configuredVoiceName;

  let liveSession: any = null;

  try {
    clientWs.send(JSON.stringify({ type: 'status', status: 'connecting', model: engineDisplayText, voice: voiceName }));

    // Connect to Google GenAI Live API
    liveSession = await ai.live.connect({
      model: underlyingGeminiModel,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
        systemInstruction: SYSTEM_PROMPT_KNOWLEDGE,
      },
      callbacks: {
        onmessage: (message: any) => {
          try {
            // Audio output from model
            const parts = message.serverContent?.modelTurn?.parts;
            if (parts && parts.length > 0) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'audio',
                      audio: part.inlineData.data,
                    })
                  );
                }
                if (part.text) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'transcript',
                      role: 'assistant',
                      text: part.text,
                    })
                  );
                }
              }
            }

            // User interrupted model turn
            if (message.serverContent?.interrupted) {
              clientWs.send(
                JSON.stringify({
                  type: 'interrupted',
                  interrupted: true,
                })
              );
            }

            // Turn complete
            if (message.serverContent?.turnComplete) {
              clientWs.send(
                JSON.stringify({
                  type: 'turnComplete',
                })
              );
            }
          } catch (err) {
            console.error('[Live WS] Error processing message from Gemini Live:', err);
          }
        },
        onclose: () => {
          console.log('[Live WS] Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'closed', message: 'Gemini Live session ended' }));
          }
        },
        onerror: (err: any) => {
          console.error('[Live WS] Gemini Live error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: 'error',
                code: 'LIVE_API_ERROR',
                message: err?.message || 'Gemini Live connection error',
              })
            );
          }
        },
      },
    });

    clientWs.send(JSON.stringify({ type: 'status', status: 'connected', model: engineDisplayText, voice: voiceName }));
  } catch (err: any) {
    console.error('[Live WS] Failed to establish Gemini Live connection:', err?.message || err);
    clientWs.send(
      JSON.stringify({
        type: 'error',
        code: 'CONNECTION_FAILED',
        message: err?.message || 'Failed to connect to Gemini Realtime Voice API',
      })
    );
    clientWs.close();
    handleDisconnect();
    return;
  }

  // Handle client audio streams & messages with size validation
  clientWs.on('message', (data) => {
    if (Buffer.byteLength(data as any) > MAX_WS_PAYLOAD_BYTES) {
      console.warn('[Live WS] Message dropped: exceeded maximum allowed payload size');
      return;
    }

    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type === 'audio' && parsed.audio && liveSession) {
        liveSession.sendRealtimeInput({
          audio: {
            data: parsed.audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        });
      } else if (parsed.type === 'text' && parsed.text && liveSession) {
        liveSession.sendRealtimeInput({
          text: parsed.text,
        });
      }
    } catch (err) {
      console.warn('[Live WS] Invalid client JSON frame:', err);
    }
  });

  clientWs.on('close', () => {
    console.log('[Live WS] Client closed connection');
    if (liveSession) {
      try {
        liveSession.close();
      } catch (_) {}
    }
    handleDisconnect();
  });

  clientWs.on('error', () => {
    if (liveSession) {
      try {
        liveSession.close();
      } catch (_) {}
    }
    handleDisconnect();
  });
});

// Vite middleware or static serving
async function setupViteOrStatic() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
}

setupViteOrStatic().then(() => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`[AI Aaji Server] Running on http://0.0.0.0:${port} (${isProduction ? 'production' : 'development'})`);
  });
});
