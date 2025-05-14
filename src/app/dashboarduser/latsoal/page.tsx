'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PencilRuler } from 'lucide-react';

interface PaketSoal {
  id: string;
  judul: string;
  deskripsi: string | null;
}

export default function LatSoalPage() {
  const [paketSoal, setPaketSoal] = useState<PaketSoal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPaketSoal = async () => {
      try {
        const response = await fetch('/api/paket-soal');
        const data = await response.json();
        setPaketSoal(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching paket soal:', error);
        setLoading(false);
      }
    };

    fetchPaketSoal();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Memuat Paket Soal...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paketSoal.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Tidak Ada Paket Soal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>
              Belum ada paket soal yang tersedia saat ini.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>Latihan Soal</h2>
        <p className='text-muted-foreground'>
          Pilih paket soal untuk mulai berlatih
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {paketSoal.map((paket) => (
          <Card
            key={paket.id}
            className='cursor-pointer transition-all hover:shadow-lg'
            onClick={() => router.push(`/dashboarduser/latsoal/${paket.id}`)}
          >
            <CardHeader>
              <div className='flex items-center gap-2'>
                <PencilRuler className='h-5 w-5 text-emerald-500' />
                <CardTitle className='text-lg'>{paket.judul}</CardTitle>
              </div>
              <p className='text-muted-foreground mt-2 line-clamp-2 text-sm'>
                {paket.deskripsi}
              </p>
            </CardHeader>
            <CardContent>
              <Button className='w-full' variant='outline'>
                Mulai Latihan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
