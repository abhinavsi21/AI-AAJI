import { handleStatusRequest } from '../server/statusBridge.js';

export default function handler(req: any, res: any) {
  return handleStatusRequest(req, res);
}
