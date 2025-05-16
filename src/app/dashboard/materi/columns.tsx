import { ColumnDef, Row, Column } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { JenisMateri } from './tambah-materi-dialog';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { DataTableRowActions } from './data-table-row-actions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LihatMateriDialog } from './lihat-materi-dialog';
import { Eye } from 'lucide-react';

export type MateriColumn = {
  id: string;
  nama: string;
  deskripsi: string | null;
  jenis: JenisMateri;
  link: string;
  createdAt: string;
  updatedAt: string;
};

interface TableMeta {
  onRefresh?: () => void;
}

const MateriCell = ({ materi }: { materi: MateriColumn }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className='flex items-center'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setShowDialog(true)}
        className='flex items-center gap-2'
      >
        <Eye className='h-4 w-4' />
        <span>
          {materi.jenis === JenisMateri.VIDEO ? 'Tonton Video' : 'Buka PDF'}
        </span>
      </Button>

      <LihatMateriDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        materi={materi}
      />
    </div>
  );
};

export const columns: ColumnDef<MateriColumn>[] = [
  {
    accessorKey: 'nama',
    header: ({ column }: { column: Column<MateriColumn> }) => (
      <DataTableColumnHeader column={column} title='Nama Materi' />
    )
  },
  {
    accessorKey: 'deskripsi',
    header: ({ column }: { column: Column<MateriColumn> }) => (
      <DataTableColumnHeader column={column} title='Deskripsi' />
    ),
    cell: ({ row }: { row: Row<MateriColumn> }) => {
      const deskripsi = row.getValue('deskripsi') as string;
      if (!deskripsi) return '-';

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='max-w-[300px] truncate'>{deskripsi}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p className='max-w-xs whitespace-pre-wrap'>{deskripsi}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  },
  {
    accessorKey: 'jenis',
    header: ({ column }: { column: Column<MateriColumn> }) => (
      <DataTableColumnHeader column={column} title='Jenis' />
    ),
    cell: ({ row }: { row: Row<MateriColumn> }) => {
      const jenis = row.getValue('jenis') as JenisMateri;
      return (
        <Badge variant={jenis === JenisMateri.VIDEO ? 'default' : 'secondary'}>
          {jenis}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'link',
    header: ({ column }: { column: Column<MateriColumn> }) => (
      <DataTableColumnHeader column={column} title='Link' />
    ),
    cell: ({ row }: { row: Row<MateriColumn> }) => (
      <MateriCell materi={row.original} />
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }: { column: Column<MateriColumn> }) => (
      <DataTableColumnHeader column={column} title='Tanggal Dibuat' />
    ),
    cell: ({ row }: { row: Row<MateriColumn> }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }: { row: Row<MateriColumn>; table: any }) => {
      const meta = table.options.meta as { onRefresh?: () => void };
      return (
        <DataTableRowActions
          row={row.original}
          onSuccess={() => {
            if (meta?.onRefresh) {
              meta.onRefresh();
            }
          }}
        />
      );
    }
  }
];
