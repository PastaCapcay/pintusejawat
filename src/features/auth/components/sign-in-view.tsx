'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

const signInFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  })
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export default function SignInViewPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      setIsLoading(true);
      console.log('Starting login process...');

      // Sign out dari sesi yang ada (jika ada)
      await supabase.auth.signOut();
      console.log('Cleared existing session');

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return;
      }

      if (authData.user) {
        console.log('Login successful, getting new session...');

        // Dapatkan sesi baru
        const {
          data: { session }
        } = await supabase.auth.getSession();
        console.log('Got new session:', {
          userId: session?.user?.id,
          hasAccessToken: !!session?.access_token
        });

        if (!session?.access_token) {
          throw new Error('No access token in new session');
        }

        // Simpan sesi aktif
        console.log('Saving session...');
        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to save session:', errorData);
          throw new Error(errorData.error || 'Failed to save session');
        }

        console.log('Session saved successfully');

        // Ambil role user dari database
        console.log('Getting user role...');
        const roleResponse = await fetch(
          `/api/user/role?userId=${authData.user.id}`,
          {
            method: 'GET'
          }
        );

        if (!roleResponse.ok) {
          const errorData = await roleResponse.json();
          console.error('Failed to get user role:', errorData);
          throw new Error(errorData.error || 'Failed to get user role');
        }

        const { role } = await roleResponse.json();
        console.log('Got user role:', role);

        // Redirect berdasarkan role
        if (role === 'ADMIN') {
          router.push('/dashboard');
        } else {
          router.push('/dashboarduser');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex h-full items-center justify-center p-4 lg:p-8'>
      <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        <div className='w-full'>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex items-center gap-2'
            )}
          >
            <ArrowLeft className='h-4 w-4' />
            Kembali ke Beranda
          </Link>
        </div>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk mengakses semua fitur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan email Anda'
                          type='email'
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan password'
                          type='password'
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className='px-8 text-center text-sm text-muted-foreground'>
          By clicking continue, you agree to our{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
