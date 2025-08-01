'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function TryoutFreePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'already_taken') {
      setHasError(true);
      toast.error('Akses Terbatas', {
        description:
          'Anda sudah menggunakan kesempatan tryout gratis. Silakan upgrade untuk akses penuh.',
        duration: 5000
      });
    }
  }, [searchParams, toast]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tryoutiqsejawat2k25') {
      toast.success('Password Benar', {
        description: 'Anda akan diarahkan untuk memulai tryout.',
        duration: 2000
      });
      setIsDialogOpen(false);
      startTryout();
    } else {
      toast.error('Password Salah', {
        description: 'Password yang Anda masukkan salah.'
      });
      setPassword('');
    }
  };

  const startTryout = async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);

    // Tampilkan toast
    toast.info('Membuka Instagram IQ Sejawat', {
      description:
        'Anda akan diarahkan ke Instagram @iq.sejawat. Silakan follow untuk mendapatkan update terbaru!',
      duration: 5000
    });

    // Tunggu sebentar sebelum buka Instagram
    setTimeout(() => {
      window.open('https://www.instagram.com/iq.sejawat/', '_blank');
    }, 1000);

    // Tunggu 5 detik sebelum redirect ke halaman tryout
    setTimeout(() => {
      router.push('/dashboarduser/tryoutfree/start');
      setIsRedirecting(false);
    }, 5000);
  };

  return (
    <div
      style={{ height: 'calc(100vh - 65px)', overflowY: 'auto' }}
      className='w-full'
    >
      <div className='p-8'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold tracking-tight'>Tryout Gratis</h2>
          <p className='text-muted-foreground'>
            Persiapkan dirimu untuk ujian dengan tryout gratis
          </p>
        </div>

        <div className='space-y-6'>
          {/* Apa itu Tryout Gratis */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-xl'>
                <Trophy className='h-6 w-6 text-yellow-500' />
                Apa itu Tryout Gratis?
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                Tryout Gratis adalah program latihan ujian yang kami sediakan
                untuk membantu Anda mempersiapkan diri menghadapi Ujian
                Kompetensi Apoteker Indonesia (UKAI). Dengan mengikuti tryout
                gratis ini, Anda akan mendapatkan:
              </p>
              <ul className='ml-4 list-inside list-disc space-y-2'>
                <li>Akses ke 50 soal latihan UKAI terbaru</li>
                <li>Waktu pengerjaan 50 menit</li>
                <li>Nilai dan analisis kemampuan per bidang kompetensi</li>
              </ul>
            </CardContent>
          </Card>

          {/* Syarat dan Ketentuan */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-xl'>
                <AlertCircle className='h-6 w-6 text-blue-500' />
                Syarat & Ketentuan
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <ul className='ml-4 list-inside list-disc space-y-2'>
                <li>Tryout gratis hanya dapat diakses satu kali per akun</li>
                <li>Waktu pengerjaan tidak dapat dijeda</li>
                <li>
                  Hasil akan langsung ditampilkan setelah selesai mengerjakan
                </li>
                <li>Soal yang diberikan merupakan contoh soal UKAI</li>
              </ul>
            </CardContent>
          </Card>

          {/* Upgrade ke Premium */}
          <Card className='bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5'>
            <CardHeader>
              <CardTitle className='text-xl'>
                Ingin Hasil yang Maksimal?
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-lg'>Upgrade paket anda dan dapatkan:</p>
              <ul className='ml-4 list-inside list-disc space-y-2'>
                <li>Akses ke 1000+ bank soal UKAI terbaru</li>
                <li>
                  Pembahasan lengkap setiap soal oleh Apoteker berpengalaman
                </li>
                <li>Tryout UKAI tidak terbatas</li>
                <li>Analisis kemampuan per bidang kompetensi</li>
                <li>Video pembelajaran materi UKAI</li>
                <li>Konsultasi dengan Apoteker pembimbing</li>
              </ul>
              <p className='mt-4 text-sm text-muted-foreground'>
                *Harga spesial untuk 100 pendaftar pertama
              </p>
            </CardContent>
          </Card>

          {/* Tombol Mulai */}
          <div className='flex justify-center'>
            {hasError ? (
              <Button
                size='lg'
                className='w-full max-w-md py-6 text-lg'
                variant='secondary'
                onClick={() => router.push('/dashboarduser/profile')}
              >
                Upgrade Sekarang
              </Button>
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size='lg'
                    className='w-full max-w-md py-6 text-lg'
                    disabled={isRedirecting}
                  >
                    Mulai Tryout Gratis
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Akses Tryout Gratis</DialogTitle>
                    <DialogDescription>
                      Masukkan password untuk mengakses tryout gratis.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePasswordSubmit} className='mt-4'>
                    <div className='grid gap-4'>
                      <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button type='submit' disabled={isRedirecting}>
                        Submit
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
