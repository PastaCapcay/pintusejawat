'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns, Soal } from './columns';
import { TambahSoalDialog } from './tambah-soal-dialog';
import { EditSoalDialog } from './edit-soal-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface PageProps {
  params: {
    id: string;
  };
}

interface PaketSoal {
  id: string;
  judul: string;
  deskripsi: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DetailSoalPage({ params }: PageProps) {
  const router = useRouter();
  const [data, setData] = useState<Soal[]>([]);
  const [paketSoal, setPaketSoal] = useState<PaketSoal | null>(null);
  const id = params.id;
  const [showTambahDialog, setShowTambahDialog] = useState(false);
  const [editingSoal, setEditingSoal] = useState<Soal | null>(null);

  const fetchData = async () => {
    try {
      const [soalResponse, paketResponse] = await Promise.all([
        fetch(`/api/soal?paketId=${id}`),
        fetch(`/api/paket-soal/${id}`)
      ]);

      if (!soalResponse.ok || !paketResponse.ok) {
        throw new Error('Gagal mengambil data');
      }

      const soalData = await soalResponse.json();
      const paketData = await paketResponse.json();

      setData(soalData);
      setPaketSoal(paketData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat mengambil data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSuccess = () => {
    fetchData();
  };

  if (!paketSoal) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium'>Paket soal tidak ditemukan</div>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => router.push('/dashboard/soal')}
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            {paketSoal.judul}
          </h2>
          <p className='text-muted-foreground'>
            {paketSoal.deskripsi || 'Tidak ada deskripsi'}
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <Button onClick={() => setShowTambahDialog(true)}>Tambah Soal</Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        meta={{
          editState: {
            openEdit: (soal: Soal) => setEditingSoal(soal)
          },
          refreshData: handleSuccess
        }}
      />

      <TambahSoalDialog
        open={showTambahDialog}
        onOpenChange={setShowTambahDialog}
        onSuccess={handleSuccess}
        paketSoalId={id}
      />

      {editingSoal && (
        <EditSoalDialog
          open={!!editingSoal}
          onOpenChange={(open) => !open && setEditingSoal(null)}
          onSuccess={handleSuccess}
          soal={editingSoal}
        />
      )}
    </div>
  );
}
