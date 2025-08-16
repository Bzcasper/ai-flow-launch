// GET /api/tools/[id]
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { badRequest, getSupabaseForRequest, isPreflight, methodNotAllowed, sendCORS, serverError } from '../_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (isPreflight(req, res)) return;

  try {
    if (req.method !== 'GET') return methodNotAllowed(res);

    const supabase = getSupabaseForRequest(req);

    const id = req.query?.id as string | undefined;
    if (!id) return badRequest(res, 'Missing id');

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    sendCORS(res);
    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return serverError(res, err);
  }
}
