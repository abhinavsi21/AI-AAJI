import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { PRODUCT_IDENTITY } from '../src/data/productData.js';

dotenv.config();

let cachedAi: GoogleGenAI | null = null;
let cachedKey: string | undefined = undefined;

export function getApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY;
}

export function hasValidApiKey(): boolean {
  const key = getApiKey();
  return Boolean(key && key.trim() !== '' && key !== 'MY_GEMINI_API_KEY');
}

export function getAiClient(): GoogleGenAI | null {
  const currentKey = getApiKey();
  if (!hasValidApiKey() || !currentKey) {
    cachedAi = null;
    cachedKey = undefined;
    return null;
  }

  if (cachedAi && cachedKey === currentKey) {
    return cachedAi;
  }

  cachedKey = currentKey;
  cachedAi = new GoogleGenAI({
    apiKey: currentKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  return cachedAi;
}

export function getUnderlyingLiveModel(): string {
  return process.env.GEMINI_LIVE_MODEL || PRODUCT_IDENTITY.configuredVoiceModel || 'gemini-3.8-live';
}

export function getVoiceName(): string {
  return process.env.GEMINI_VOICE || PRODUCT_IDENTITY.configuredVoiceName || 'Aoede';
}

export function getChatModel(): string {
  return PRODUCT_IDENTITY.chatModel || 'gemini-3.8-flash';
}
