// GET /api/tools -> list tools
// POST /api/tools -> create tool (auth required via Supabase bearer token)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { badRequest, getSupabaseForRequest, isPreflight, methodNotAllowed, sendCORS, serverError, getAllowedOrigin, rateLimit } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (isPreflight(req, res)) return;

  try {
    const origin = getAllowedOrigin(req);
    if (!rateLimit(req, res)) {
      sendCORS(res, origin);
      return res.status(429).json({ ok: false, error: 'Too Many Requests' });
    }
    const supabase = getSupabaseForRequest(req);

    if (req.method === 'GET') {
      const { page = '0', pageSize = '20' } = (req.query || {}) as Record<string, string | string[]>;
      const p = Array.isArray(page) ? page[0] : page;
      const s = Array.isArray(pageSize) ? pageSize[0] : pageSize;
      const from = Math.max(0, parseInt(p || '0', 10));
      const size = Math.min(100, Math.max(1, parseInt(s || '20', 10)));
      const to = from + size - 1;

      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

  if (error) throw error;
  sendCORS(res, origin);
      return res.status(200).json({ ok: true, data: data ?? [] });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const { title, description, category, url, thumbnail, user_id } = body || {};
      if (!title || !description || !user_id) {
        return badRequest(res, 'Missing required fields: title, description, user_id');
      }

      const { data, error } = await supabase
        .from('tools')
        .insert({ title, description, category, url, thumbnail, user_id })
        .select('*')
        .single();

  if (error) throw error;
  sendCORS(res, origin);
      return res.status(201).json({ ok: true, data });
    }

    return methodNotAllowed(res);
  } catch (err) {
    return serverError(res, err);
  }
}
