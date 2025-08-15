// POST /api/tools/[id]/download -> increments downloads counter
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseService, isPreflight, methodNotAllowed, sendCORS, serverError, badRequest, getAllowedOrigin, rateLimit } from '../../_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (isPreflight(req, res)) return;
  const origin = getAllowedOrigin(req);

  try {
    if (req.method !== 'POST') return methodNotAllowed(res);

    if (!rateLimit(req, res)) {
      sendCORS(res, origin);
      return res.status(429).json({ ok: false, error: 'Too Many Requests' });
    }

    const id = (req.query?.id || (req as any).query?.id) as string | undefined;
    if (!id) return badRequest(res, 'Missing id');

    // Use service role + RPC for atomic increment
    const supabase = getSupabaseService();
    const rpc = await (supabase as any).rpc('increment_tool_downloads', { tool_id: id });
    if (rpc.error) throw rpc.error;
    const { data, error } = await (supabase as any)
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;

    sendCORS(res, origin);
  return res.status(200).json({ ok: true, data });
  } catch (err) {
    return serverError(res, err);
  }
}
