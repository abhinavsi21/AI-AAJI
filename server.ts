import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { handleStatusRequest } from './server/statusBridge.js';
import { handleChatRequest } from './server/chatBridge.js';
import { handleLiveVoiceConnection, logLiveRouteInit } from './server/liveBridge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Log route initialization diagnostics
logLiveRouteInit(isProduction ? 'Cloud Run / Node Production' : 'Local Dev Server');

// Security Headers (compatible with Google AI Studio iframe preview environment)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'microphone=(self), camera=()');
  next();
});

// JSON body parser with strict size limit
app.use(express.json({ limit: '64kb' }));

// Status & Configuration Endpoint
app.get('/api/status', (req, res) => {
  return handleStatusRequest(req, res);
});

// Chatbot endpoint with Workflow Architect and tool execution
app.post('/api/chat', (req, res) => {
  return handleChatRequest(req, res);
});

// Direct HTTP GET fallback for /api/live-ws to provide clear diagnostics when visited over HTTP
app.get('/api/live-ws', (req, res) => {
  res.status(200).json({
    status: 'ok',
    endpoint: '/api/live-ws',
    service: 'AI Aaji Realtime Voice WebSocket Endpoint',
    protocol: 'websocket',
    upgradeRequired: true,
    message: 'Connect via WebSocket (ws:// or wss://) with Gemini Live PCM audio protocol.',
  });
});

// WebSocket Server for Gemini Live Realtime Audio Bridge
const wss = new WebSocketServer({ server, path: '/api/live-ws' });

wss.on('connection', (clientWs: WebSocket, req: http.IncomingMessage) => {
  handleLiveVoiceConnection(clientWs, req);
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
    console.log(`[AI Aaji Server] Live Audio WebSocket endpoint active on ws://0.0.0.0:${port}/api/live-ws`);
  });
});

export default server;
