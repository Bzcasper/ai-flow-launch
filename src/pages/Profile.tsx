import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long.'),
  avatar_url: z.string().url('Please enter a valid URL.').optional(),
});

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      avatar_url: '',
    },
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.setValue('username', data.username);
        if (data.avatar_url) {
          form.setValue('avatar_url', data.avatar_url);
          setAvatarUrl(data.avatar_url);
        }
      }
    } catch (error) {
      toast({
        title: 'Error fetching profile',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user, getProfile]);

  const updateProfile = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      setIsSubmitting(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        username: values.username,
        avatar_url: values.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      toast({
        title: 'Profile updated successfully!',
      });
      if (values.avatar_url) {
        setAvatarUrl(values.avatar_url);
      }
    } catch (error) {
      toast({
        title: 'Error updating the profile',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      if (!user) throw new Error('No user');

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      if (data) {
        form.setValue('avatar_url', data.publicUrl);
        setAvatarUrl(data.publicUrl);
        updateProfile(form.getValues());
      }

    } catch (error) {
      toast({
        title: 'Error uploading avatar',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>
        <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl || ''} alt="User avatar" />
              <AvatarFallback>{form.getValues('username')?.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex justify-center">
            <Input id="avatar-upload" type="file" onChange={handleAvatarUpload} className="hidden" />
            <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button as="span">Upload Avatar</Button>
            </Label>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateProfile)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
