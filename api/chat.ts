import { handleChatRequest } from '../server/chatBridge.js';

export default async function handler(req: any, res: any) {
  return handleChatRequest(req, res);
}
