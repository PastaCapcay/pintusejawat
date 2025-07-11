'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
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
import { getDeviceId } from '@/lib/device-id';
import { UserAuthForm } from './user-auth-form';

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

export function SignInView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'no_device_id') {
      setError('Sesi tidak valid. Silakan login ulang.');
    }
  }, [searchParams]);

  const onSignIn = useCallback(
    async (userId: string) => {
      try {
        const deviceId = getDeviceId();

        const response = await fetch('/api/user-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            deviceId
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Gagal login. Silakan coba lagi.');
          return;
        }

        // Cek role untuk redirect
        const roleRes = await fetch(`/api/user/role?userId=${userId}`);
        const roleData = await roleRes.json();

        if (roleData.role === 'ADMIN') {
          router.push('/dashboard');
        } else {
          router.push('/dashboarduser');
        }
      } catch (error) {
        console.error('Error signing in:', error);
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    },
    [router]
  );

  return (
    <div className='container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img src='/hero.svg' alt='Logo' className='mr-2 h-8 w-8' />
          Pintu Sejawat
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Platform belajar online untuk persiapan UKMPPD yang
              berkualitas dan terpercaya.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Login ke akun anda
            </h1>
            <p className='text-sm text-muted-foreground'>
              Masukkan email anda untuk login
            </p>
          </div>
          {error && (
            <div
              className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'
              role='alert'
            >
              <span className='block sm:inline'>{error}</span>
            </div>
          )}
          <UserAuthForm onSignIn={onSignIn} />
        </div>
      </div>
    </div>
  );
}
