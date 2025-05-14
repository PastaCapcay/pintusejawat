'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Timer, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaketSoal {
  id: string;
  judul: string;
  deskripsi: string | null;
  soal: { id: string }[];
}

export default function TryoutPage() {
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
      <div className='flex h-screen items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>Paket Tryout</h2>
        <p className='text-muted-foreground'>
          Pilih paket tryout sesuai kebutuhan Anda
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {paketSoal.map((paket) => (
          <Card key={paket.id} className='relative overflow-hidden'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='h-5 w-5' />
                {paket.judul}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>{paket.deskripsi}</p>

              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <FileText className='text-muted-foreground h-4 w-4' />
                  <span>{paket.soal.length} Soal</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Timer className='text-muted-foreground h-4 w-4' />
                  <span>{paket.soal.length} Menit</span>
                </div>
              </div>

              <div className='border-t pt-4'>
                <Button
                  className='w-full'
                  onClick={() =>
                    router.push(`/dashboarduser/tryout/${paket.id}/start`)
                  }
                >
                  Mulai Tryout
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
