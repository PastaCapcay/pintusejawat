'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DataTable } from './data-table';
import { columns, MateriColumn } from './columns';
import { useEffect, useState } from 'react';
import { TambahMateriDialog, JenisMateri } from './tambah-materi-dialog';
import { Materi } from '@prisma/client';

export default function MateriPage() {
  const [data, setData] = useState<MateriColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTambahDialog, setShowTambahDialog] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/materi');
      const json: Materi[] = await response.json();
      const convertedData: MateriColumn[] = json.map((item) => ({
        ...item,
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
        jenis: item.jenis as unknown as JenisMateri
      }));
      setData(convertedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex-1 space-y-6 p-8 pt-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Manajemen Materi
          </h2>
          <p className='text-muted-foreground'>
            Kelola materi pembelajaran di sini
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={() => setShowTambahDialog(true)}>
            <PlusIcon className='mr-2 h-4 w-4' />
            Tambah Materi
          </Button>
        </div>
      </div>

      <div className='rounded-lg border'>
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          onRefresh={fetchData}
        />
      </div>

      <TambahMateriDialog
        open={showTambahDialog}
        onOpenChange={setShowTambahDialog}
        onSuccess={() => {
          setShowTambahDialog(false);
          fetchData();
        }}
      />
    </div>
  );
}
