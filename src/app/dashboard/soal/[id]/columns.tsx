'use client';

import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AlertDialogDelete } from '@/components/ui/alert-dialog-delete';
import { useState } from 'react';
import { toast } from 'sonner';

export type Soal = {
  id: string;
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
  jawabanBenar: string;
  pembahasan: string | null;
  createdAt: string;
  updatedAt: string;
  paketSoalId: string;
};

interface TableMeta {
  refreshData: () => void;
  editState: {
    openEdit: (soal: Soal) => void;
  };
}

const Actions = ({ row, table }: { row: Row<Soal>; table: Table<Soal> }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/soal/${row.original.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus soal');
      }

      toast.success('Soal berhasil dihapus');
      // Refresh data
      const meta = table.options.meta as TableMeta;
      meta?.refreshData();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat menghapus soal');
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
              onClick={() => {
                const meta = table.options.meta as TableMeta;
                if (meta?.editState) {
                  meta.editState.openEdit(row.original);
                }
              }}
            >
              <Pencil className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Soal</p>
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
            <p>Hapus Soal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogDelete
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title='Hapus Soal'
        description='Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.'
      />
    </div>
  );
};

export const columns: ColumnDef<Soal>[] = [
  {
    accessorKey: 'pertanyaan',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pertanyaan
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pertanyaan = row.getValue('pertanyaan') as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='max-w-[300px] truncate'>{pertanyaan}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p className='max-w-[500px] whitespace-pre-wrap'>{pertanyaan}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  },
  {
    accessorKey: 'jawabanBenar',
    header: 'Jawaban Benar',
    cell: ({ row }) => {
      const jawaban = row.getValue('jawabanBenar') as string;
      return <div>Opsi {jawaban}</div>;
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Dibuat',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return <div>{date.toLocaleDateString('id-ID')}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <Actions row={row} table={table} />
  }
];
