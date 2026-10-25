import { PRODUCT_IDENTITY } from '../src/data/productData.js';
import {
  hasValidApiKey,
  getVoiceName,
  getChatModel,
} from './geminiClient.js';

function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

export function handleStatusRequest(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const isConfigured = hasValidApiKey();
  const voice = getVoiceName();
  const chatModel = getChatModel();

  return sendJson(res, 200, {
    status: 'ok',
    configured: isConfigured,
    hasApiKey: isConfigured,
    liveModel: 'aiaaji live',
    voice,
    chatModel,
    downloadUrl: process.env.AI_AAJI_DOWNLOAD_URL || PRODUCT_IDENTITY.downloadUrl,
    downloadVersion: PRODUCT_IDENTITY.downloadVersion,
    contactEmail: PRODUCT_IDENTITY.contactEmail,
  });
}
