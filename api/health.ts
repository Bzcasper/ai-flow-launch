import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isPreflight, sendCORS } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (isPreflight(req, res)) return;
  sendCORS(res);
  return res.status(200).json({ ok: true, status: 'healthy', timestamp: new Date().toISOString() });
}
