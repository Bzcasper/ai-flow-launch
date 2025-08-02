import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadZoneProps {
  onUpload: (files: File[]) => Promise<void>;
}

export const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      await onUpload(acceptedFiles);
      setUploadStatus('success');
      toast({
        title: 'Upload successful!',
        description: `${acceptedFiles.length} tool(s) uploaded successfully.`,
      });
      
      // Reset status after animation
      setTimeout(() => setUploadStatus('idle'), 2000);
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your tools. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
      'application/octet-stream': ['.agentic'],
    },
    multiple: true,
  });

  const getStatusIcon = () => {
    if (isUploading) return <Upload className="w-8 h-8 animate-bounce-micro" />;
    if (uploadStatus === 'success') return <CheckCircle className="w-8 h-8 text-green-500" />;
    if (uploadStatus === 'error') return <AlertCircle className="w-8 h-8 text-destructive" />;
    return <Upload className="w-8 h-8" />;
  };

  const getStatusText = () => {
    if (isUploading) return 'Uploading tools...';
    if (uploadStatus === 'success') return 'Upload successful!';
    if (uploadStatus === 'error') return 'Upload failed';
    return isDragActive ? 'Drop your tools here' : 'Drag & drop your AI tools';
  };

  return (
    <Card 
      {...getRootProps()}
      className={`
        relative p-8 border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragActive 
          ? 'border-primary bg-primary/5 shadow-glow' 
          : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
        }
        ${uploadStatus === 'success' ? 'animate-upload-success' : ''}
        ${isUploading ? 'animate-glow-pulse' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center text-muted-foreground">
          {getStatusIcon()}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{getStatusText()}</h3>
          <p className="text-sm text-muted-foreground">
            Supports .zip and .agentic files • Max 10MB per file
          </p>
        </div>

        {!isDragActive && uploadStatus === 'idle' && (
          <Button variant="outline" className="mt-4">
            <File className="w-4 h-4 mr-2" />
            Browse files
          </Button>
        )}
      </div>

      {/* Progress indicator */}
      {isUploading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div className="h-full bg-gradient-primary animate-pulse"></div>
        </div>
      )}
    </Card>
  );
};