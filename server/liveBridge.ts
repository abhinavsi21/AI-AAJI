import type { IncomingMessage } from 'http';
import { WebSocket } from 'ws';
import { Modality } from '@google/genai';
import { SYSTEM_PROMPT_KNOWLEDGE } from '../src/data/productData.js';
import {
  getAiClient,
  hasValidApiKey,
  getUnderlyingLiveModel,
  getVoiceName,
} from './geminiClient.js';

// In-Memory WebSocket Connection Limits (per-instance)
const activeWsPerIp = new Map<string, number>();
const wsAttemptsPerIp = new Map<string, { count: number; resetTime: number }>();
const MAX_CONCURRENT_WS = 3;
const MAX_WS_PER_MIN = 15;
const MAX_WS_PAYLOAD_BYTES = 512 * 1024; // 512 KB

export function checkWsAllowed(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const active = activeWsPerIp.get(ip) || 0;
  if (active >= MAX_CONCURRENT_WS) {
    return {
      allowed: false,
      reason: 'Maximum concurrent voice sessions reached for this IP. Please close another tab or session.',
    };
  }

  const attemptEntry = wsAttemptsPerIp.get(ip);
  if (!attemptEntry || now > attemptEntry.resetTime) {
    wsAttemptsPerIp.set(ip, { count: 1, resetTime: now + 60000 });
  } else {
    if (attemptEntry.count >= MAX_WS_PER_MIN) {
      return {
        allowed: false,
        reason: 'Too many connection attempts. Please wait a minute before retrying.',
      };
    }
    attemptEntry.count += 1;
  }

  activeWsPerIp.set(ip, active + 1);
  return { allowed: true };
}

export function releaseWsConnection(ip: string) {
  const active = activeWsPerIp.get(ip) || 0;
  if (active <= 1) {
    activeWsPerIp.delete(ip);
  } else {
    activeWsPerIp.set(ip, active - 1);
  }
}

// Diagnostics helper
export function logLiveRouteInit(source: string) {
  const model = getUnderlyingLiveModel();
  const voice = getVoiceName();
  console.log(`[Live WS - ${source}] Initializing Gemini Live Voice WebSocket route handler`);
  console.log(`[Live WS - ${source}] Configured Upstream Model: ${model} | Voice Persona: ${voice}`);
}

export async function handleLiveVoiceConnection(clientWs: WebSocket, req: IncomingMessage) {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const userAgent = req.headers['user-agent'] || 'unknown';
  const secProtocol = req.headers['sec-websocket-protocol'] || 'none';

  console.log(`[Live WS] Incoming client connection from IP: ${clientIp} | Protocol: ${secProtocol} | UA: ${userAgent.slice(0, 50)}`);

  const wsCheck = checkWsAllowed(clientIp);
  if (!wsCheck.allowed) {
    console.warn(`[Live WS] Connection rejected for ${clientIp}: ${wsCheck.reason}`);
    try {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          code: 'CONNECTION_LIMIT_EXCEEDED',
          message: wsCheck.reason,
        })
      );
      clientWs.close(1008, 'Connection limit exceeded');
    } catch (_) {}
    return;
  }

  let isCleanedUp = false;
  const handleDisconnect = (reasonText?: string) => {
    if (isCleanedUp) return;
    isCleanedUp = true;
    releaseWsConnection(clientIp);
    console.log(`[Live WS] Cleaned up session resources for IP: ${clientIp}${reasonText ? ` (${reasonText})` : ''}`);
  };

  const ai = getAiClient();
  if (!ai || !hasValidApiKey()) {
    console.warn(`[Live WS] Connection halted for ${clientIp}: GEMINI_API_KEY is not configured in environment`);
    try {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          code: 'API_KEY_MISSING',
          message:
            'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in your hosting environment (Google AI Studio Secrets or Vercel Environment Variables) to enable real-time voice streaming.',
        })
      );
      clientWs.close(1008, 'API key missing');
    } catch (_) {}
    handleDisconnect('API key missing');
    return;
  }

  const underlyingGeminiModel = getUnderlyingLiveModel();
  const engineDisplayText = 'aiaaji live';
  const voiceName = getVoiceName();

  let liveSession: any = null;

  try {
    clientWs.send(
      JSON.stringify({
        type: 'status',
        status: 'connecting',
        model: engineDisplayText,
        voice: voiceName,
      })
    );

    console.log(`[Live WS] Connecting to upstream Gemini Live API (model: ${underlyingGeminiModel}, voice: ${voiceName})...`);

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
          console.log('[Live WS] Upstream Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'closed', message: 'Gemini Live session ended' }));
          }
        },
        onerror: (err: any) => {
          console.error('[Live WS] Upstream Gemini Live error:', err?.message || err);
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

    console.log('[Live WS] Upstream Gemini Live session established successfully');
    clientWs.send(
      JSON.stringify({
        type: 'status',
        status: 'connected',
        model: engineDisplayText,
        voice: voiceName,
      })
    );
  } catch (err: any) {
    console.error('[Live WS] Failed to establish Gemini Live upstream connection:', err?.message || err);
    try {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          code: 'CONNECTION_FAILED',
          message: err?.message || 'Failed to connect to Gemini Realtime Voice API',
        })
      );
      clientWs.close(1011, 'Upstream connection failed');
    } catch (_) {}
    handleDisconnect('Upstream connection failed');
    return;
  }

  // Handle client audio streams & messages with size validation
  clientWs.on('message', (data) => {
    if (Buffer.byteLength(data as any) > MAX_WS_PAYLOAD_BYTES) {
      console.warn('[Live WS] Message dropped: exceeded maximum allowed payload size (512KB)');
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
      console.warn('[Live WS] Invalid client JSON frame received');
    }
  });

  clientWs.on('close', (code, reason) => {
    console.log(`[Live WS] Client closed WebSocket connection (IP: ${clientIp}, code: ${code}, reason: ${reason ? reason.toString() : 'normal'})`);
    if (liveSession) {
      try {
        liveSession.close();
      } catch (_) {}
    }
    handleDisconnect('Client closed');
  });

  clientWs.on('error', (err) => {
    console.error(`[Live WS] Client WebSocket error (IP: ${clientIp}):`, err?.message || err);
    if (liveSession) {
      try {
        liveSession.close();
      } catch (_) {}
    }
    handleDisconnect('Client error');
  });
}
