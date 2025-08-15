import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

const Auth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuth = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // First, try to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          // If sign-in fails, try to sign up
          const { error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });
          if (signUpError) {
            throw signUpError;
          }
          toast({
            title: 'Account created!',
            description: 'Please check your email to verify your account.',
          });
        } else {
          throw signInError;
        }
      } else {
        toast({
          title: 'Signed in successfully!',
        });
      }
  navigate('/app');
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to AIToolPool</h1>
          <p className="text-muted-foreground">Sign in or create an account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Sign In / Sign Up'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
