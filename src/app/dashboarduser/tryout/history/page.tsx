'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TryoutHistory {
  id: string;
  score: number;
  timeSpent: number;
  createdAt: string;
  paketSoal: {
    id: string;
    judul: string;
    deskripsi: string | null;
  };
}

interface GroupedHistory {
  [key: string]: {
    paketSoal: TryoutHistory['paketSoal'];
    attempts: TryoutHistory[];
  };
}

export default function TryoutHistoryPage() {
  const [history, setHistory] = useState<TryoutHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/tryout-history');
        const data = await response.json();
        setHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tryout history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Memuat History...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Belum Ada History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>
              Anda belum pernah mengerjakan tryout. Mulai kerjakan tryout untuk
              melihat history.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Group history by paket soal
  const groupedHistory = history.reduce((acc, item) => {
    const paketId = item.paketSoal.id;
    if (!acc[paketId]) {
      acc[paketId] = {
        paketSoal: item.paketSoal,
        attempts: []
      };
    }
    acc[paketId].attempts.push(item);
    return acc;
  }, {} as GroupedHistory);

  return (
    <div className='p-4 md:p-8'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>History Tryout</h2>
        <p className='text-muted-foreground'>
          Pilih paket soal untuk melihat detail history pengerjaan
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Object.values(groupedHistory).map(({ paketSoal, attempts }) => (
          <Card
            key={paketSoal.id}
            className='cursor-pointer transition-all hover:shadow-lg'
            onClick={() =>
              router.push(`/dashboarduser/tryout/history/${paketSoal.id}`)
            }
          >
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Trophy className='text-primary h-5 w-5' />
                  <CardTitle className='text-lg'>{paketSoal.judul}</CardTitle>
                </div>
                <Badge variant='secondary'>{attempts.length}x</Badge>
              </div>
              <p className='text-muted-foreground mt-2 line-clamp-2 text-sm'>
                {paketSoal.deskripsi}
              </p>
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground flex items-center justify-between text-sm'>
                <span>Lihat Detail History</span>
                <ChevronRight className='h-4 w-4' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
