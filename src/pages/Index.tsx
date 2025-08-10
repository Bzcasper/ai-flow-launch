import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolCard } from '@/components/ToolCard';
import { ToolModal } from '@/components/ToolModal';
import { UploadZone } from '@/components/UploadZone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import heroBackground from '@/assets/hero-background.jpg';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

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
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tools').select('*');
      if (error) throw error;
      setTools(data as Tool[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching tools',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter tools based on search
  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tool.category && tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Stagger animation for tool cards
  useEffect(() => {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      card.classList.add('animate-stagger-fade');
    });
  }, [filteredTools]);

  const handleLaunchTool = (id: string) => {
    const tool = tools.find(t => t.id === id);
    if (tool) {
      setSelectedTool(tool);
      setIsModalOpen(true);
    }
  };

  const handleDownloadTool = (id: string) => {
    // Simulate download
    const tool = tools.find(t => t.id === id);
    if (tool) {
      // In a real app, this would trigger an actual download
      console.log('Downloading:', tool.title);
    }
  };

  const onUploadSuccess = () => {
    setIsUploadOpen(false);
    fetchTools();
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
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

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No tools found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="tool-card opacity-0">
                <ToolCard
                  {...tool}
                  onLaunch={handleLaunchTool}
                  onDownload={handleDownloadTool}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Tools Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
          <p className="text-muted-foreground">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="tool-card opacity-0">
                <ToolCard
                  {...tool}
                  onLaunch={handleLaunchTool}
                  onDownload={handleDownloadTool}
                />
              </div>
            ))}
          </div>
        )}
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
