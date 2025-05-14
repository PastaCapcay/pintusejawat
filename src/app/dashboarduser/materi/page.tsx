'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Video } from 'lucide-react';
import { LihatMateriDialog } from '@/app/dashboard/materi/lihat-materi-dialog';
import { JenisMateri } from '@/app/dashboard/materi/tambah-materi-dialog';

interface Materi {
  id: string;
  nama: string;
  deskripsi: string | null;
  jenis: 'VIDEO' | 'DOKUMEN';
  link: string;
  createdAt: string;
  updatedAt: string;
}

export default function MateriPage() {
  const [materi, setMateri] = useState<Materi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMateri, setSelectedMateri] = useState<Materi | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const response = await fetch('/api/materi');
        if (response.ok) {
          const data = await response.json();
          setMateri(data);
        }
      } catch (error) {
        console.error('Failed to fetch materi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateri();
  }, []);

  const dokumenMateri = materi.filter((m) => m.jenis === 'DOKUMEN');
  const videoMateri = materi.filter((m) => m.jenis === 'VIDEO');

  const handleLihatMateri = (materi: Materi) => {
    setSelectedMateri(materi);
    setShowDialog(true);
  };

  return (
    <div className='container mx-auto max-w-7xl p-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Materi Pembelajaran
          </h1>
          <p className='text-muted-foreground'>
            Pilih materi pembelajaran yang ingin Anda pelajari
          </p>
        </div>

        <Tabs defaultValue='dokumen' className='w-full'>
          <TabsList className='h-11 w-full max-w-[400px]'>
            <TabsTrigger
              value='dokumen'
              className='flex flex-1 items-center gap-2'
            >
              <FileText className='h-4 w-4' />
              Dokumen
            </TabsTrigger>
            <TabsTrigger
              value='video'
              className='flex flex-1 items-center gap-2'
            >
              <Video className='h-4 w-4' />
              Video
            </TabsTrigger>
          </TabsList>

          <div className='mt-6'>
            <TabsContent value='dokumen' className='m-0'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {dokumenMateri.map((item) => (
                  <Card
                    key={item.id}
                    className='flex flex-col overflow-hidden border'
                  >
                    <CardHeader className='flex flex-col gap-2'>
                      <CardTitle className='line-clamp-1 text-base'>
                        {item.nama}
                      </CardTitle>
                      <CardDescription className='line-clamp-2 text-sm'>
                        {item.deskripsi || 'Tidak ada deskripsi'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='mt-auto pt-0'>
                      <Button
                        variant='secondary'
                        className='w-full'
                        onClick={() => handleLihatMateri(item)}
                      >
                        <FileText className='mr-2 h-4 w-4' />
                        Buka PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {dokumenMateri.length === 0 && (
                  <div className='text-muted-foreground col-span-full py-6 text-center'>
                    Belum ada materi dokumen yang tersedia
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value='video' className='m-0'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {videoMateri.map((item) => (
                  <Card
                    key={item.id}
                    className='flex flex-col overflow-hidden border'
                  >
                    <CardHeader className='flex flex-col gap-2'>
                      <CardTitle className='line-clamp-1 text-base'>
                        {item.nama}
                      </CardTitle>
                      <CardDescription className='line-clamp-2 text-sm'>
                        {item.deskripsi || 'Tidak ada deskripsi'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='mt-auto pt-0'>
                      <Button
                        variant='secondary'
                        className='w-full'
                        onClick={() => handleLihatMateri(item)}
                      >
                        <Video className='mr-2 h-4 w-4' />
                        Tonton Video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {videoMateri.length === 0 && (
                  <div className='text-muted-foreground col-span-full py-6 text-center'>
                    Belum ada materi video yang tersedia
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {selectedMateri && (
        <LihatMateriDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          materi={{
            ...selectedMateri,
            jenis: selectedMateri.jenis as JenisMateri
          }}
        />
      )}
    </div>
  );
}
