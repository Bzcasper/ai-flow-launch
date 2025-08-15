import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import Index from '../Index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// Mock supabase client to return predictable data pages
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    range: vi.fn().mockImplementation((from: number, to: number) => ({
      data: Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => ({
        id: `id-${from + i}`,
        title: `Tool ${from + i}`,
        description: 'desc',
        thumbnail: null,
        category: null,
        downloads: 0,
        url: 'https://example.com',
      })),
      error: null,
    })),
  },
}));

// Mock Auth context used by Index
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ session: null, user: null, signOut: vi.fn() }),
}));

// Mock IntersectionObserver
class MockIO {
  callback: IntersectionObserverCallback;
  elements: Element[] = [];
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb;
  // collect instances to trigger later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = (globalThis as any).__ioInstances as MockIO[] | undefined;
  if (store) store.push(this);
  else (globalThis as any).__ioInstances = [this];
  }
  observe = (el: Element) => {
    this.elements.push(el);
  };
  unobserve = () => {};
  disconnect = () => {};
  // helper to trigger
  triggerIntersect = () => {
    const entries = this.elements.map((el) => ({
      isIntersecting: true,
      target: el,
    })) as IntersectionObserverEntry[];
    this.callback(entries, this as unknown as IntersectionObserver);
  };
}

// Assign mock to global
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;

const renderIndex = () => {
  const qc = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={qc}>
        <Index />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Index infinite scroll', () => {
  it('fetches next page when sentinel intersects', async () => {
  // Ensure /api/tools path (fetch) does not interfere; force fallback to Supabase
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('no api'));

    const view = renderIndex();

    // There is a sentinel div with height 12; get it via aria-hidden
    const sentinel = view.container.querySelector('div[aria-hidden]');
    expect(sentinel).toBeTruthy();

    // Trigger intersection
    // Get the first IO instance and trigger
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instances = (globalThis as any).__ioInstances as MockIO[] | undefined;
    expect(instances && instances.length).toBeGreaterThan(0);
    await act(async () => {
      instances![0].triggerIntersect();
    });

    // Expect more tool cards rendered after next page fetch
    // Wait until at least 2 tool titles are present
    await waitFor(() => {
      const items = screen.getAllByText(/Tool /);
      expect(items.length).toBeGreaterThan(1);
    });
  });
});
