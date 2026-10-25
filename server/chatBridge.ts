import { ThinkingLevel } from '@google/genai';
import { SYSTEM_PROMPT_KNOWLEDGE, PRODUCT_IDENTITY } from '../src/data/productData.js';
import { WorkflowArchitect } from '../src/services/workflowArchitect.js';
import { getAiClient, getChatModel } from './geminiClient.js';

// In-Memory Rate Limiting for Chat
const chatRateLimits = new Map<string, { count: number; resetTime: number }>();
const CHAT_WINDOW_MS = 60 * 1000;
const MAX_CHAT_PER_MIN = 60;

export function isChatRateLimited(ip: string): boolean {
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

// Helper to respond in both Express and raw Node/Vercel serverless environments
function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

export async function handleChatRequest(req: any, res: any) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  if (isChatRateLimited(clientIp)) {
    return sendJson(res, 429, {
      error: 'Rate limit exceeded. Please wait a moment before sending another message.',
    });
  }

  // Parse body if not already parsed
  let body = req.body;
  if (!body && req.on) {
    try {
      const buffers: any[] = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers).toString('utf-8');
      if (rawBody) {
        body = JSON.parse(rawBody);
      }
    } catch (_) {}
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {}
  }

  const { message } = body || {};
  if (!message || typeof message !== 'string') {
    return sendJson(res, 400, { error: 'Message must be a non-empty string' });
  }

  const sanitizedMessage = message.trim();
  if (!sanitizedMessage) {
    return sendJson(res, 400, { error: 'Message cannot be empty' });
  }

  if (sanitizedMessage.length > 2000) {
    return sendJson(res, 400, { error: 'Message exceeds maximum length of 2000 characters' });
  }

  // Determine intent & tool using Workflow Architect
  const toolSelection = WorkflowArchitect.selectTool(sanitizedMessage);
  const ai = getAiClient();

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

      const chatModel = getChatModel();
      const geminiPromise = ai.models.generateContent({
        model: chatModel,
        contents: [
          {
            role: 'user',
            parts: [{ text: contextualPrompt }],
          },
        ],
        config: {
          temperature: 0.6,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini response timed out')), 15000)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const reply = response.text || "Hello! I'm AI Aaji. How can I assist you today?";
      return sendJson(res, 200, {
        reply,
        mode: 'workflow-gemini',
        toolUsed: selectedTool?.name,
        toolStatus: selectedTool?.statusMessage,
      });
    } catch (err: any) {
      console.log('[Chat] Gemini generation deferred, serving via Workflow Architect execution:', err?.message || err);
    }
  }

  // Fallback to Workflow Architect execution engine
  const workflowResult = await WorkflowArchitect.executeWorkflow(sanitizedMessage);
  return sendJson(res, 200, workflowResult);
}
