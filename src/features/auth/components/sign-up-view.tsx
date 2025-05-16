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

const signUpFormSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    email: z.string().email({
      message: 'Please enter a valid email.'
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpViewPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(data: SignUpFormValues) {
    try {
      setIsLoading(true);

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (authData.user) {
        // Buat user di database
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: authData.user.id,
            email: data.email,
            name: data.name
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create user in database');
        }

        toast.success(
          'Pendaftaran berhasil! Silahkan login untuk melanjutkan.'
        );
        router.push('/auth/sign-in');
      }
    } catch (error) {
      toast.error('Something went wrong');
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
            <CardTitle>Daftar</CardTitle>
            <CardDescription>
              Buat akun baru untuk mengakses semua fitur.
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
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan nama Anda'
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
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Konfirmasi password Anda'
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
                  {isLoading ? 'Loading...' : 'Daftar'}
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
