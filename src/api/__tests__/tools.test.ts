import { describe, it, expect, vi, beforeEach } from 'vitest';

// Minimal Vercel-like req/res mocks
function createRes() {
  const res: any = {};
  res.statusCode = 200;
  res.headers = {};
  res.setHeader = (k: string, v: string) => { res.headers[k] = v; };
  res.status = (c: number) => { res.statusCode = c; return res; };
  res.json = (b: any) => { res.body = b; return res; };
  res.end = () => res;
  return res;
}

// Mock Supabase client used in handler via module proxy
process.env.SUPABASE_URL = 'http://localhost:54321';
process.env.SUPABASE_ANON_KEY = 'test';
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => ({
          range: async () => ({ data: [{ id: 'a' }], error: null }),
        }),
      }),
    }),
  }),
}));

// utils will be mocked per-test using vi.mock after resetModules

describe('GET /api/tools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns list of tools', async () => {
    vi.resetModules();
    vi.mock('../../../api/_utils', async () => {
      const actual = await vi.importActual<any>('../../../api/_utils');
      return {
        ...actual,
        isPreflight: () => false,
        getAllowedOrigin: () => '*',
        rateLimit: () => true,
        getSupabaseForRequest: () => ({
          from: () => ({
            select: () => ({
              order: () => ({
                range: async () => ({ data: [{ id: 'a' }], error: null }),
              }),
            }),
          }),
        }),
      };
    });
    const req: any = { method: 'GET', query: { page: '0', pageSize: '10' }, headers: {} };
    const res = createRes();
  const { default: handler } = await import('../../../api/tools');
  await handler(req, res as any);
    expect(res.statusCode).toBe(200);
    expect(res.body?.ok).toBe(true);
    expect(Array.isArray(res.body?.data)).toBe(true);
  });

  // Rate limit path can be exercised with integration tests; skipping brittle unit mock
});

describe('POST /api/tools/:id/download', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('../../../api/_utils', async () => {
    const mod = await vi.importActual<any>('../../../api/_utils');
    return {
      ...mod,
      getSupabaseService: () => ({
        from: () => ({
          select: () => ({ eq: () => ({ single: () => ({ data: { downloads: 1 }, error: null }) }) }),
          update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: { id: 'x', downloads: 2 }, error: null }) }) }) }),
        }),
      }),
      getAllowedOrigin: () => '*',
      rateLimit: () => true,
      isPreflight: () => false,
    };
  });

  it('increments downloads', async () => {
    vi.resetModules();
    vi.mock('../../../api/_utils', async () => {
      const actual = await vi.importActual<any>('../../../api/_utils');
      return {
        ...actual,
        isPreflight: () => false,
        getAllowedOrigin: () => '*',
        rateLimit: () => true,
        getSupabaseService: () => ({
          rpc: async () => ({ error: null }),
          from: () => ({
            select: () => ({ eq: () => ({ single: () => ({ data: { id: 'x', downloads: 2 }, error: null }) }) }),
          }),
        }),
      };
    });
    const req: any = { method: 'POST', query: { id: 'x' }, headers: {} };
    const res = createRes();
  const { default: downloadHandler } = await import('../../../api/tools/[id]/download');
    await downloadHandler(req, res as any);
    expect(res.statusCode).toBe(200);
    expect(res.body?.ok).toBe(true);
    expect(res.body?.data?.downloads).toBe(2);
  });
});
