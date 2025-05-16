'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Validasi password
      if (formData.password !== formData.confirmPassword) {
        toast.error('Password tidak sama');
        setIsLoading(false);
        return;
      }

      console.log('Mencoba sign up ke Supabase dengan:', {
        email: formData.email,
        name: formData.name
      });

      // Sign up dengan Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      console.log('Response dari Supabase:', { data, error });

      if (error) {
        console.error('Error Supabase:', error);
        toast.error(error.message);
        return;
      }

      if (data.user) {
        console.log('User berhasil dibuat di Supabase:', data.user);

        // Buat user di database Prisma
        console.log('Mencoba membuat user di Prisma dengan:', {
          id: data.user.id,
          email: formData.email,
          name: formData.name
        });

        const createUserResponse = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: data.user.id,
            email: formData.email,
            name: formData.name
          })
        });

        console.log('Response dari API Prisma:', {
          status: createUserResponse.status,
          ok: createUserResponse.ok
        });

        const responseData = await createUserResponse.json();
        console.log('Data response dari API Prisma:', responseData);

        if (!createUserResponse.ok) {
          console.error('Gagal membuat user di Prisma:', responseData);
          // Jika gagal membuat di Prisma, hapus user dari Supabase
          await supabase.auth.admin.deleteUser(data.user.id);
          throw new Error('Gagal membuat user di database');
        }

        toast.success(
          'Pendaftaran berhasil! Silahkan login untuk melanjutkan.'
        );
        router.push('/auth/sign-in');
      }
    } catch (error) {
      console.error('Error dalam proses sign up:', error);
      toast.error('Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className='container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-primary' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img src='/favicon-32x32.png' alt='Logo' className='mr-2 h-8 w-8' />
          Pintu Sejawat
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
      <div className='lg:p-8'>
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
              Daftar Akun Baru
            </h1>
            <p className='text-center text-sm text-muted-foreground'>
              Masukkan data diri Anda untuk mendaftar
            </p>
          </div>
          <Card>
            <form onSubmit={onSubmit}>
              <CardContent className='grid gap-4 pt-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Nama Lengkap</Label>
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Masukkan nama lengkap'
                    disabled={isLoading}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='nama@contoh.com'
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='confirmPassword'>Konfirmasi Password</Label>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    disabled={isLoading}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col gap-4'>
                <Button className='w-full' type='submit' disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Daftar'}
                </Button>
                <div className='text-center text-sm text-muted-foreground'>
                  Sudah punya akun?{' '}
                  <Link
                    href='/auth/sign-in'
                    className='text-primary hover:underline'
                  >
                    Masuk
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
