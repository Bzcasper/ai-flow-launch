import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolCard } from '@/components/ToolCard';
import { ToolModal } from '@/components/ToolModal';
import { UploadZone } from '@/components/UploadZone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import heroBackground from '@/assets/hero-background.jpg';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

type Tool = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string | null;
  downloads: number;
  url: string | null;
};

const Index = () => {
  const { session, user, signOut } = useAuth();
  const PAGE_SIZE = 20;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [manualPaging, setManualPaging] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['tools', PAGE_SIZE],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
  const from = pageParam as number;
  const params = new URLSearchParams({ page: String(from), pageSize: String(PAGE_SIZE) });
      try {
        const resp = await fetch(`/api/tools?${params.toString()}`);
        if (resp.ok) {
          const json = await resp.json();
          return (json?.data ?? []) as Tool[];
        }
        // fall through to client-side Supabase fetch
      } catch (e) {
        console.error('Could not fetch tools from API, falling back to Supabase', e);
      }

      // Fallback: direct Supabase query for local dev
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      if (error) throw error;
      return (data ?? []) as Tool[];
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  });

  // Filter tools based on search
  const allTools = useMemo(() => (data?.pages.flat() ?? []) as Tool[], [data]);
  const filteredTools = useMemo(
    () =>
      allTools.filter((tool) =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tool.category && tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [allTools, searchQuery]
  );

  // Stagger animation for tool cards
  useEffect(() => {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      card.classList.add('animate-stagger-fade');
    });
  }, [filteredTools]);

  useEffect(() => {
    if (!sentinelRef.current || manualPaging) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        fetchNextPage();
      }
    }, { rootMargin: '200px' });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [fetchNextPage, manualPaging]);

  const handleLaunchTool = (id: string) => {
    const tool = allTools.find((t) => t.id === id) || filteredTools.find((t) => t.id === id);
    if (tool) {
      setSelectedTool(tool);
      setIsModalOpen(true);
    }
  };

  const handleDownloadTool = (id: string) => {
  const tool = allTools.find((t) => t.id === id) || filteredTools.find((t) => t.id === id);
  if (!tool) return;
  // Fire-and-forget increment; UI will reflect on next refresh or navigation
  fetch(`/api/tools/${id}/download`, { method: 'POST' }).catch(() => {});
  };

  const onUploadSuccess = () => {
    setIsUploadOpen(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
  <header className="absolute top-0 right-0 p-4">
        {session ? (
          <div className="flex items-center gap-4">
    <span className="text-white">Welcome, {user?.email}</span>
            <Link to="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        ) : (
      <Link to="/auth">
            <Button>Login</Button>
          </Link>
        )}
      </header>
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_33%_28%_/0.85)] to-[hsl(203_100%_55%_/0.7)]" />
        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-primary-foreground">
              AITool Pool
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Discover, test, and download AI tools instantly. Zero-click testing in your browser.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="shadow-primary" disabled={!session}>
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Upload AI Tool
                  </DialogTitle>
                </DialogHeader>
                <UploadZone onUploadSuccess={onUploadSuccess} />
              </DialogContent>
            </Dialog>
            
            <Button size="lg" className="bg-white/10 text-primary-foreground border border-white/20 hover:bg-white/20">
              <Search className="w-5 h-5 mr-2" />
              Browse Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-muted/30 border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-0 bg-background shadow-card"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
          <p className="text-muted-foreground">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {isLoading ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No tools found.</p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <ToolCard
                  {...tool}
                  onLaunch={handleLaunchTool}
                  onDownload={handleDownloadTool}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center">
          {hasNextPage ? (
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant="outline">
              {isFetchingNextPage ? 'Loading…' : 'Load more?'}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">You’ve reached the end.</p>
          )}
        </div>
        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-12" aria-hidden />
      </main>

      {/* Tool Modal */}
      <ToolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tool={selectedTool}
        onDownload={handleDownloadTool}
      />
    </div>
  );
};

export default Index;
