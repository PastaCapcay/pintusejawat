'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getDeviceId } from '@/lib/device-id';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email tidak valid.'
  }),
  password: z.string().min(6, {
    message: 'Password minimal 6 karakter.'
  })
});

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Mencoba login dengan kredensial baru...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });

      if (error) {
        throw error;
      }

      // Ambil deviceId
      const deviceId = getDeviceId();
      // Simpan userId ke localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', data.user.id);
      }
      // Panggil endpoint user-session
      const sessionRes = await fetch('/api/user-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id, deviceId })
      });
      if (!sessionRes.ok) {
        const err = await sessionRes.json();
        throw new Error(err.error || 'Gagal update session user');
      }

      console.log('Login berhasil, mengecek role user...');
      // Cek role user
      const response = await fetch(`/api/user/role?userId=${data.user.id}`);
      const { role } = await response.json();

      toast.success('Login Berhasil!', {
        description: 'Selamat datang kembali. Anda akan diarahkan...',
        duration: 2000
      });

      // Redirect berdasarkan role setelah notifikasi muncul
      setTimeout(() => {
        if (role === 'ADMIN') {
          router.push('/dashboard');
        } else {
          router.push('/dashboarduser');
        }
      }, 1500);
    } catch (error: any) {
      console.error('Error during login:', error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Login Gagal', {
          description:
            'Email atau password yang Anda masukkan salah. Silakan coba lagi.'
        });
      } else {
        toast.error('Login Gagal', {
          description:
            'Terjadi kesalahan yang tidak diketahui. Silakan coba beberapa saat lagi.'
        });
      }
    }
  }

  return (
    <div className='container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div
        className='relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-black opacity-60' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img src='/favicon-32x32.png' alt='Logo' className='mr-2 h-8 w-8' />
          IQ Sejawat
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Platform belajar online untuk tenaga kesehatan yang ingin
              meningkatkan kompetensi dan pengetahuan mereka.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2'>
            <Link
              href='/'
              className='mb-4 flex items-center text-muted-foreground hover:text-primary'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Kembali ke Beranda
            </Link>
            <h1 className='text-center text-2xl font-semibold tracking-tight'>
              Login ke Akun Anda
            </h1>
            <p className='text-center text-sm text-muted-foreground'>
              Masukkan email dan password Anda untuk login
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='nama@email.com'
                        {...field}
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
                        type='password'
                        placeholder='Masukkan password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Belum punya akun?{' '}
            <Link
              href='/auth/sign-up'
              className='underline underline-offset-4 hover:text-primary'
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
