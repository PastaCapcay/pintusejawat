'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon, Upload } from 'lucide-react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { TambahPaketDialog } from './tambah-paket-dialog';
import { UploadPaketDialog } from './upload-paket-dialog';
import { EditPaketDialog } from './edit-paket-dialog';

interface PaketSoal {
  id: string;
  judul: string;
  deskripsi: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function SoalPage() {
  const [data, setData] = useState<PaketSoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTambahDialog, setShowTambahDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [editingPaket, setEditingPaket] = useState<PaketSoal | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/paket-soal');
      if (!response.ok) {
        throw new Error('Gagal memuat data');
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium'>Memuat data...</div>
          <div className='text-muted-foreground text-sm'>
            Mohon tunggu sebentar
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium text-red-500'>{error}</div>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => fetchData()}
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-1 flex-col space-y-8 p-8'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Manajemen Soal</h2>
          <p className='text-muted-foreground'>
            Kelola paket soal dan soal-soal di sini
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className='mr-2 h-4 w-4' />
            Upload Paket Soal
          </Button>
          <Button onClick={() => setShowTambahDialog(true)}>
            <PlusIcon className='mr-2 h-4 w-4' />
            Tambah Paket Soal
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        meta={{
          refreshData: fetchData,
          editState: {
            openEdit: (paket: PaketSoal) => setEditingPaket(paket)
          }
        }}
      />

      {showTambahDialog && (
        <TambahPaketDialog
          open={showTambahDialog}
          onOpenChange={setShowTambahDialog}
          onSuccess={fetchData}
        />
      )}

      {showUploadDialog && (
        <UploadPaketDialog
          open={showUploadDialog}
          onOpenChange={setShowUploadDialog}
          onSuccess={fetchData}
        />
      )}

      {editingPaket && (
        <EditPaketDialog
          open={!!editingPaket}
          onOpenChange={(open) => {
            if (!open) setEditingPaket(null);
          }}
          onSuccess={fetchData}
          paketSoal={editingPaket}
        />
      )}
    </div>
  );
}
