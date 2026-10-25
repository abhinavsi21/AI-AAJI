import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { handleLiveVoiceConnection, logLiveRouteInit } from '../server/liveBridge.js';

logLiveRouteInit('Vercel Function api/live-ws');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(
    JSON.stringify({
      status: 'ok',
      endpoint: '/api/live-ws',
      service: 'AI Aaji Realtime Voice WebSocket Endpoint',
      protocol: 'websocket',
      upgradeRequired: true,
      message: 'Connect via WebSocket (wss://) with Gemini Live PCM audio protocol.',
    })
  );
});

// Create WebSocket server attached to HTTP server (accepting upgrades routed to this function)
const wss = new WebSocketServer({ server });

wss.on('connection', (clientWs: WebSocket, req: http.IncomingMessage) => {
  handleLiveVoiceConnection(clientWs, req);
});

export default server;
