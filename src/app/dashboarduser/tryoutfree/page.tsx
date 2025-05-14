'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TryoutFreePage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'already_taken') {
      setHasError(true);
      toast({
        variant: 'destructive',
        title: 'Akses Terbatas',
        description:
          'Anda sudah menggunakan kesempatan tryout gratis. Silakan upgrade untuk akses penuh.',
        duration: 5000
      });
    }
  }, [searchParams, toast]);

  const startTryout = async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);

    // Tampilkan toast
    toast({
      title: 'Membuka Instagram Pintu Sejawat',
      description:
        'Anda akan diarahkan ke Instagram @pintusejawat. Silakan follow untuk mendapatkan update terbaru!',
      duration: 5000
    });

    // Tunggu sebentar sebelum buka Instagram
    setTimeout(() => {
      window.open(
        'https://www.instagram.com/pintusejawat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        '_blank'
      );
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
                untuk membantu Anda mempersiapkan diri menghadapi ujian CPNS,
                PPPK, dan Kedinasan. Dengan mengikuti tryout gratis ini, Anda
                akan mendapatkan:
              </p>
              <ul className='ml-4 list-inside list-disc space-y-2'>
                <li>Akses ke 10 soal latihan terbaru</li>
                <li>Waktu pengerjaan 10 menit</li>
                <li>Pembahasan singkat setiap soal</li>
                <li>Nilai dan analisis kemampuan dasar</li>
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
                <li>Pembahasan hanya diberikan untuk 3 soal pertama</li>
              </ul>
            </CardContent>
          </Card>

          {/* Upgrade ke Premium */}
          <Card className='from-primary/5 via-primary/10 to-primary/5 bg-gradient-to-br'>
            <CardHeader>
              <CardTitle className='text-xl'>
                Ingin Hasil yang Maksimal?
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-lg'>Upgrade ke paket Premium dan dapatkan:</p>
              <ul className='ml-4 list-inside list-disc space-y-2'>
                <li>Akses ke 1000+ soal terbaru</li>
                <li>Pembahasan lengkap setiap soal</li>
                <li>Tryout tidak terbatas</li>
                <li>Analisis kemampuan mendalam</li>
                <li>Video pembelajaran eksklusif</li>
                <li>Konsultasi dengan pengajar</li>
              </ul>
              <p className='text-muted-foreground mt-4 text-sm'>
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
              <Button
                size='lg'
                className='w-full max-w-md py-6 text-lg'
                onClick={startTryout}
                disabled={isRedirecting}
              >
                Mulai Tryout Gratis
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
