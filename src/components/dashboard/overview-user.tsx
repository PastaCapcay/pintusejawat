'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';

export function Overview() {
  const { user } = useUser();
  const userName = user?.firstName || user?.username || 'User';

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-2xl font-bold'>Selamat Datang!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-muted-foreground mb-4 text-lg'>
            Hai <span className='text-primary font-semibold'>{userName}</span>,
            selamat datang di PintuSejawat!
          </div>
          <div className='text-muted-foreground space-y-2'>
            <p>
              Platform all-in-one untuk persiapan UKAI yang akan membantu kamu:
            </p>
            <ul className='ml-4 list-inside list-disc space-y-1'>
              <li>Berlatih dengan ribuan soal UKAI terbaru</li>
              <li>Mengikuti tryout yang diupdate secara berkala</li>
              <li>Mempelajari materi-materi penting UKAI</li>
              <li>Mendapatkan analisis performa detail</li>
            </ul>
            <p className='text-primary mt-4 font-medium'>
              Mulai perjalananmu menuju kesuksesan UKAI bersama kami!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
