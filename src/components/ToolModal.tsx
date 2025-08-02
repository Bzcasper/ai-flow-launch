import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: {
    id: string;
    title: string;
    description: string;
    url: string;
  } | null;
  onDownload: (id: string) => void;
}

export const ToolModal = ({ isOpen, onClose, tool, onDownload }: ToolModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`animate-spring-modal border-0 shadow-glow p-0 ${
          isFullscreen 
            ? 'w-screen h-screen max-w-none max-h-none' 
            : 'w-[90vw] h-[80vh] max-w-6xl'
        }`}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">
            {tool.title}
          </DialogTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(tool.id)}
              className="text-primary-foreground hover:bg-white/10 h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-primary-foreground hover:bg-white/10 h-8 w-8 p-0"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-primary-foreground hover:bg-white/10 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Tool iframe */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src={tool.url}
            className="w-full h-full border-none"
            title={tool.title}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
          />
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-muted-foreground">Loading tool...</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};