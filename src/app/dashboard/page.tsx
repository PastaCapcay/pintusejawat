'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  BookOpen,
  GraduationCap,
  Trophy,
  TrendingUp
} from 'lucide-react';

interface DashboardData {
  stats: {
    totalUsers: number;
    percentageChange: number;
    totalTryout: number;
    tryoutPercentageChange: number;
    totalMateri: number;
    materiPercentageChange: number;
    averageScore: number;
    scorePercentageChange: number;
    totalSoalTersedia: number;
  };
  tryoutHistory: Array<{
    month: string;
    jawabanBenar: number;
    totalSoal: number;
    nilai: number;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/overview');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        console.log('API Response:', result);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Pengguna
            </CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-2'>
              <div className='text-2xl font-bold'>
                {data?.stats.totalUsers.toLocaleString()}
              </div>
              <div className='flex flex-col text-xs'>
                <div className='flex items-center space-x-1'>
                  <TrendingUp className='h-4 w-4 text-green-500' />
                  <span className='font-medium text-green-500'>
                    +{data?.stats.percentageChange}%
                  </span>
                </div>
                <div className='text-muted-foreground'>
                  <div>Total pengguna aktif</div>
                  <div>Dibandingkan bulan lalu</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tryout</CardTitle>
            <GraduationCap className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-2'>
              <div>
                <div className='text-2xl font-bold'>
                  {data.stats.totalTryout} Paket
                </div>
                <p className='text-muted-foreground text-xs'>
                  Total paket tryout tersedia
                </p>
              </div>
              <div>
                <div className='text-xl font-semibold'>
                  {data.stats.totalSoalTersedia} Soal
                </div>
                <p className='text-muted-foreground text-xs'>
                  Total bank soal tersedia
                </p>
              </div>
              <div className='flex flex-col text-xs'>
                <div className='flex items-center space-x-1'>
                  <TrendingUp className='h-4 w-4 text-green-500' />
                  <span className='font-medium text-green-500'>
                    +{data.stats.tryoutPercentageChange}%
                  </span>
                </div>
                <div className='text-muted-foreground'>
                  <div>Dibandingkan bulan lalu</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Materi</CardTitle>
            <BookOpen className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-2'>
              <div className='text-2xl font-bold'>{data.stats.totalMateri}</div>
              <div className='flex flex-col text-xs'>
                <div className='flex items-center space-x-1'>
                  <TrendingUp className='h-4 w-4 text-green-500' />
                  <span className='font-medium text-green-500'>
                    +{data.stats.materiPercentageChange}%
                  </span>
                </div>
                <div className='text-muted-foreground'>
                  <div>Total materi tersedia</div>
                  <div>Dibandingkan bulan lalu</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Rata-rata Nilai
            </CardTitle>
            <Trophy className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-2'>
              <div className='text-2xl font-bold'>
                {data.stats.averageScore}
              </div>
              <div className='flex flex-col text-xs'>
                <div className='flex items-center space-x-1'>
                  <TrendingUp className='h-4 w-4 text-green-500' />
                  <span className='font-medium text-green-500'>
                    +{data.stats.scorePercentageChange}%
                  </span>
                </div>
                <div className='text-muted-foreground'>
                  <div>Rata-rata nilai tryout</div>
                  <div>Dibandingkan bulan lalu</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
