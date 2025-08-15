import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Play, ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string | null;
  downloads: number;
  onLaunch: (id: string) => void;
  onDownload: (id: string) => void;
}

export const ToolCard = ({ 
  id, 
  title, 
  description, 
  thumbnail, 
  category, 
  downloads,
  onLaunch,
  onDownload
}: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 hover:scale-[1.02] cursor-pointer border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onLaunch(id)}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1}>
          <div className="absolute inset-0">
            <img 
              src={thumbnail || '/placeholder.svg'}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </AspectRatio>

        {/* Reflection */}
        <div className="relative h-16 -mt-2 pointer-events-none select-none">
          <img
            src={thumbnail || '/placeholder.svg'}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-y-[-1] opacity-30 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
        
        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 animate-bounce-micro">
            <Play className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
        </div>

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-lg font-medium">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Stats and actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {downloads.toLocaleString()} downloads
          </span>
          
          <div className="flex gap-1 items-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(id);
              }}
              className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Download className="w-4 h-4" />
            </Button>
            <a
              href={`/tool/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary hover:underline px-2 py-1 rounded"
            >
              See more
            </a>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onLaunch(id);
              }}
              className="h-8 w-8 p-0 hover:bg-secondary/10 hover:text-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};