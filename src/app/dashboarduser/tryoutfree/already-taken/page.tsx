'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AlreadyTakenPage() {
  const router = useRouter();

  return (
    <div className='flex min-h-[calc(100vh-65px)] items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-8'>
        <Card className='text-center'>
          <CardHeader>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100'>
              <Trophy className='h-6 w-6 text-yellow-600' />
            </div>
            <CardTitle className='text-2xl'>
              Anda Sudah Mengerjakan Tryout Gratis
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <p className='text-muted-foreground'>
              Terima kasih telah mencoba layanan tryout gratis kami. Untuk
              mengakses lebih banyak soal dan fitur, silakan upgrade ke paket
              premium.
            </p>

            <div className='from-primary/5 via-primary/10 to-primary/5 rounded-lg bg-gradient-to-br p-6'>
              <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <Star className='h-5 w-5 text-yellow-500' />
                Keuntungan Upgrade ke Premium
              </h3>
              <div className='grid gap-3'>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Akses ke 1000+ soal terbaru dan terupdate</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Pembahasan lengkap untuk setiap soal</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Tryout tidak terbatas</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Analisis kemampuan mendalam</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Video pembelajaran eksklusif</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Konsultasi dengan pengajar berpengalaman</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <Button
                size='lg'
                className='w-full'
                onClick={() => router.push('/dashboarduser/upgrade')}
              >
                Upgrade Sekarang
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/dashboarduser')}
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
