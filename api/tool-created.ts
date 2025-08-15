// Vercel Serverless Function: handle tool creation webhook and return page path
// Supports raw payloads or Supabase Database Webhook shape { record: {...} }

export default async function handler(req: any, res: any) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = req.body ?? {};
    const record = (body as any)?.record ?? body; // handle Supabase webhook or direct body
    const id: string | undefined = (record as any)?.id;
    if (!id) {
      return res.status(400).json({ ok: false, error: 'Missing tool id in payload' });
    }

    // Your SPA already has a dynamic route at /tool/:id that fetches from Supabase.
    // We simply return the canonical path the client can navigate to.
    const pagePath = `/tool/${id}`;

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ ok: true, pagePath });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err?.message ?? 'Internal Error' });
  }
}
