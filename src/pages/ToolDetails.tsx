import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Tool = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string | null;
  downloads: number;
  url: string | null;
  created_at: string;
};

export default function ToolDetails() {
  const { id } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const resp = await fetch(`/api/tools/${id}`);
        if (resp.ok) {
          const json = await resp.json();
          setTool(json?.data as Tool);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Could not fetch tool from API, falling back to Supabase', e);
      }
      // Fallback to Supabase client for dev
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setTool(data as Tool);
      setLoading(false);
    };
    fetchTool();
  }, [id]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-24 w-full" />
      </main>
    );
  }

  if (!tool) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-muted-foreground">Tool not found.</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to tools
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="-ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <img
            src={tool.thumbnail || '/placeholder.svg'}
            alt={tool.title}
            className="w-full h-64 object-cover rounded-lg border"
          />
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div>Category: {tool.category || '—'}</div>
            <div>Downloads: {tool.downloads.toLocaleString()}</div>
            <div>Added: {new Date(tool.created_at).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{tool.title}</h1>
          <p className="mt-4 text-base text-foreground/80">{tool.description}</p>
          {tool.url && (
            <a href={tool.url} target="_blank" rel="noreferrer">
              <Button className="mt-6">
                Visit Website <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
