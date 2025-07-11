'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

// Definisikan fitur berdasarkan grade
const gradeFitur = {
  FREE: ['Akses 1x tryout gratis', 'Akses Terbatas', 'Cocok Buat Coba-Coba'],
  STARTER: [
    'Akses selama 3 bulan',
    'Semua Tryout',
    'Analisis performa lengkap',
    'Fitur Basic',
    'Buat yang baru mulai serius'
  ],
  PRO: [
    'Akses selama 3 bulan',
    'Semua Tryout',
    'Analisis performa lengkap',
    'Latihan Soal',
    'Modul Belajar Lengkap',
    'Belajar Lebih Terarah'
  ],
  PRO_PLUS: [
    'Akses sampai lulus',
    'Akses semua materi',
    'Analisis performa lengkap',
    'Bank soal lengkap',
    'Konsultasi 24 jam dengan mentor',
    'Garansi perpanjangan jika belum lulus'
  ]
};

// Definisikan next upgrade untuk setiap grade
const nextUpgrade = {
  FREE: {
    grade: 'STARTER',
    text: 'Upgrade ke Starter untuk akses lebih banyak fitur!'
  },
  STARTER: {
    grade: 'PRO',
    text: 'Upgrade ke Pro untuk akses penuh!'
  },
  PRO: {
    grade: 'PRO_PLUS',
    text: 'Upgrade ke Pro Plus untuk akses sampai lulus!'
  }
};

function OverviewSkeleton() {
  return (
    <div className='grid gap-4 p-4 md:p-6'>
      <Card className='mx-auto w-full max-w-4xl'>
        <CardHeader className='flex flex-col items-center justify-between space-y-2 pb-2 md:flex-row md:space-y-0'>
          <Skeleton className='h-8 w-48' />
        </CardHeader>
        <CardContent>
          <div className='mb-4 space-y-2'>
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-4 w-1/4' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-1/3' />
            <div className='ml-4 space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-4/5' />
            </div>
          </div>
          <div className='mt-6'>
            <Skeleton className='mb-2 h-5 w-2/5' />
            <Skeleton className='h-10 w-36' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Overview() {
  const [userName, setUserName] = useState('User');
  const [userGrade, setUserGrade] = useState('FREE');
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (user) {
          // Fetch user data from API endpoint
          const response = await fetch('/api/user/profile');
          const userData = await response.json();

          if (userData) {
            setUserName(userData.name || user.user_metadata?.name || 'User');
            setUserGrade(userData.grade || 'FREE');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase.auth]);

  const handleUpgrade = () => {
    router.push('/dashboarduser/upgrade');
  };

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <div className='grid gap-4 p-4 md:p-6'>
      <Card className='mx-auto w-full max-w-4xl'>
        <CardHeader className='flex flex-col items-center justify-between space-y-2 pb-2 md:flex-row md:space-y-0'>
          <CardTitle className='text-center text-xl font-bold md:text-left md:text-2xl'>
            Selamat Datang!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4 text-center text-base text-muted-foreground md:text-left md:text-lg'>
            Hai <span className='font-semibold text-primary'>{userName}</span>,
            selamat datang di IQ Sejawat!
          </div>
          <div className='space-y-2 text-muted-foreground'>
            <p className='text-sm md:text-base'>
              Status Keanggotaan:{' '}
              <span className='font-semibold text-primary'>
                {userGrade.replace('_', ' ')}
              </span>
            </p>
            <p className='text-sm md:text-base'>Fitur yang tersedia:</p>
            <ul className='ml-4 list-inside list-disc space-y-1 text-sm md:text-base'>
              {gradeFitur[userGrade as keyof typeof gradeFitur].map(
                (fitur, index) => (
                  <li key={index}>{fitur}</li>
                )
              )}
            </ul>
            {userGrade !== 'PRO_PLUS' && (
              <div className='mt-6 text-center md:text-left'>
                <p className='mb-2 text-sm font-medium text-primary md:text-base'>
                  {nextUpgrade[userGrade as keyof typeof nextUpgrade].text}
                </p>
                <Button
                  onClick={handleUpgrade}
                  className='bg-primary text-white'
                >
                  Upgrade Sekarang
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
