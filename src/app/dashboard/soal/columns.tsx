'use client';

import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AlertDialogDelete } from '@/components/ui/alert-dialog-delete';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaketSoal {
  id: string;
  judul: string;
  deskripsi: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TableMeta {
  refreshData: () => void;
  editState: {
    openEdit: (paket: PaketSoal) => void;
  };
}

const Actions = ({
  row,
  table
}: {
  row: Row<PaketSoal>;
  table: Table<PaketSoal>;
}) => {
  const router = useRouter();
  const paketSoal = row.original;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/paket-soal/${paketSoal.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus paket soal');
      }

      toast.success('Paket soal berhasil dihapus');
      // Refresh data
      const meta = table.options.meta as TableMeta;
      meta?.refreshData();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat menghapus paket soal');
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.push(`/dashboard/soal/${paketSoal.id}`)}
            >
              <Eye className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lihat Soal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                const meta = table.options.meta as TableMeta;
                if (meta?.editState) {
                  meta.editState.openEdit(paketSoal);
                }
              }}
            >
              <Pencil className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Paket Soal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hapus Paket Soal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogDelete
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title='Hapus Paket Soal'
        description='Apakah Anda yakin ingin menghapus paket soal ini? Semua soal yang ada di dalamnya juga akan terhapus.'
      />
    </div>
  );
};

export const columns: ColumnDef<PaketSoal>[] = [
  {
    accessorKey: 'judul',
    header: 'Judul',
    cell: ({ row }: { row: Row<PaketSoal> }) => {
      const judul = row.getValue('judul') as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='max-w-[200px] truncate'>{judul}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{judul}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  },
  {
    accessorKey: 'deskripsi',
    header: 'Deskripsi',
    cell: ({ row }: { row: Row<PaketSoal> }) => {
      const deskripsi = row.getValue('deskripsi') as string;
      if (!deskripsi) return '-';
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='max-w-[300px] truncate'>{deskripsi}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{deskripsi}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Dibuat',
    cell: ({ row }: { row: Row<PaketSoal> }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div>{date.toLocaleDateString('id-ID')}</div>;
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Terakhir Diubah',
    cell: ({ row }: { row: Row<PaketSoal> }) => {
      const date = new Date(row.getValue('updatedAt'));
      return <div>{date.toLocaleDateString('id-ID')}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <Actions row={row} table={table} />
  }
];
