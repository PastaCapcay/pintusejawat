'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';

export function Overview() {
  const { user } = useUser();
  const userName = user?.firstName || user?.username || 'Admin';

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-2xl font-bold'>Selamat Datang!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-muted-foreground mb-4 text-lg'>
            Hai <span className='text-primary font-semibold'>{userName}</span>,
            selamat datang di Dashboard Admin PintuSejawat!
          </div>
          <div className='text-muted-foreground space-y-2'>
            <p>Kelola platform PintuSejawat dengan fitur-fitur berikut:</p>
            <ul className='ml-4 list-inside list-disc space-y-1'>
              <li>Manajemen bank soal dan tryout</li>
              <li>Pengelolaan materi pembelajaran</li>
              <li>Monitoring aktivitas pengguna</li>
              <li>Analisis performa platform</li>
            </ul>
            <p className='text-primary mt-4 font-medium'>
              Mari bantu calon dokter Indonesia meraih kesuksesan UKAI!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
