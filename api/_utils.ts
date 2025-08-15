// Shared utilities for serverless API routes
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const DISABLE_RATE_LIMIT = process.env.DISABLE_RATE_LIMIT === '1' || process.env.RATE_LIMIT_DISABLED === '1';

// naive in-memory fixed-window per-ip limiter
const visits = new Map<string, { count: number; windowStart: number }>();
const DEFAULT_LIMIT = parseInt(process.env.RATE_LIMIT || '60', 10); // 60 reqs
const DEFAULT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // per minute

export function getClientIp(req: VercelRequest) {
  const xf = (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']) as string | undefined;
  return (xf?.split(',')[0]?.trim()) || req.socket?.remoteAddress || 'unknown';
}

export function rateLimit(req: VercelRequest, res: VercelResponse, limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS) {
  if (DISABLE_RATE_LIMIT) return true;
  try {
    const key = getClientIp(req);
    const now = Date.now();
    const entry = visits.get(key);
    if (!entry || now - entry.windowStart >= windowMs) {
      visits.set(key, { count: 1, windowStart: now });
      return true;
    }
    if (entry.count < limit) {
      entry.count += 1;
      return true;
    }
    // limit exceeded
    sendCORS(res, getAllowedOrigin(req));
    res.setHeader('Retry-After', Math.ceil((entry.windowStart + windowMs - now) / 1000).toString());
    res.status(429).json({ ok: false, error: 'Too Many Requests' });
    return false;
  } catch {
    return true;
  }
}

export function getAllowedOrigin(req: VercelRequest): string {
  const origin = (req.headers['origin'] || req.headers['Origin']) as string | undefined;
  if (ALLOWED_ORIGINS.length === 0) return '*';
  if (!origin) return ALLOWED_ORIGINS[0];
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

export function sendCORS(res: VercelResponse, origin = '*') {
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export function isPreflight(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    sendCORS(res, getAllowedOrigin(req));
    res.status(204).end();
    return true;
  }
  return false;
}

export function getBearerToken(req: VercelRequest): string | null {
  const auth = (req.headers['authorization'] || req.headers['Authorization']) as string | undefined;
  if (!auth) return null;
  const [scheme, token] = auth.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

export function getSupabaseForRequest(req: VercelRequest) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
  }
  const token = getBearerToken(req);
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
  });
}

export function getSupabaseService() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export function badRequest(res: VercelResponse, message: string) {
  sendCORS(res);
  return res.status(400).json({ ok: false, error: message });
}

export function methodNotAllowed(res: VercelResponse) {
  sendCORS(res);
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

export function serverError(res: VercelResponse, error: Error) {
  sendCORS(res);
  const message = (error && (error.message || error.toString())) || 'Internal Error';
  return res.status(500).json({ ok: false, error: message });
}
