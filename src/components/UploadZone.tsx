import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long.'),
    description: z.string().min(10, 'Description must be at least 10 characters long.'),
    category: z.string().optional(),
    url: z.string().url('Please enter a valid URL.').optional(),
});

export const UploadZone = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      url: '',
    },
  });

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      form.setValue('title', acceptedFiles[0].name.replace(/\.[^/.]+$/, ''));
    }
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file || !user) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
        let thumbnailUrl: string | null = null;
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('tool-thumbnails').upload(fileName, file);

            if (uploadError) {
                throw new Error(`Thumbnail upload failed: ${uploadError.message}`);
            }
            const { data } = supabase.storage.from('tool-thumbnails').getPublicUrl(fileName);
            thumbnailUrl = data.publicUrl;
        }

      const { error } = await supabase.from('tools').insert({
        ...values,
        user_id: user.id,
        thumbnail: thumbnailUrl,
      });

      if (error) {
        throw error;
      }

      setUploadStatus('success');
      toast({
        title: 'Upload successful!',
        description: `${values.title} uploaded successfully.`,
      });
      onUploadSuccess();
      setTimeout(() => {
        setFile(null);
        form.reset();
        setUploadStatus('idle');
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: 'Upload failed',
        description: (error as Error).message || 'There was an error uploading your tool. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    multiple: false,
  });

  if (file) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center gap-4">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                        <h3 className="font-semibold">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="url" render={({ field }) => (
                    <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Tool'}
                </Button>
            </form>
        </Form>
    )
  }

  return (
    <Card 
      {...getRootProps()}
      className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center space-y-4">
        <div className="flex justify-center text-muted-foreground">
          <Upload className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {isDragActive ? 'Drop thumbnail here' : 'Drag & drop a thumbnail'}
          </h3>
          <p className="text-sm text-muted-foreground">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
        <Button variant="outline" className="mt-4">
            <File className="w-4 h-4 mr-2" />
            Browse file
        </Button>
      </div>
    </Card>
  );
};