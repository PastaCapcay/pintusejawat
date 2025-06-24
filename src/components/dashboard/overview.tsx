'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export function Overview() {
  const [userName, setUserName] = useState('Admin');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };

    getUser();
  }, [supabase.auth]);

  return (
    <div className='grid gap-4'>
      <Card className='border-border'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-2xl font-bold text-foreground'>
            Selamat Datang!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4 text-lg text-muted-foreground'>
            Hai <span className='font-semibold text-primary'>{userName}</span>,
            selamat datang di Dashboard Admin IQ Sejawat!
          </div>
          <div className='space-y-2 text-muted-foreground'>
            <p>Kelola platform IQ Sejawat dengan fitur-fitur berikut:</p>
            <ul className='ml-4 list-inside list-disc space-y-1'>
              <li>Manajemen bank soal dan tryout</li>
              <li>Pengelolaan materi pembelajaran</li>
              <li>Monitoring aktivitas pengguna</li>
              <li>Analisis performa platform</li>
            </ul>
            <p className='mt-4 font-medium text-primary'>
              Mari bantu calon Apoteker Indonesia meraih kesuksesan UKAI!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
