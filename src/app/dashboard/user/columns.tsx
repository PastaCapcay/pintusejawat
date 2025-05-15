import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Role, Grade } from '@prisma/client';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export type UserColumn = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  grade: Grade;
  createdAt: string;
};

interface TableMeta {
  onRefresh?: () => void;
}

export const columns: ColumnDef<UserColumn, any>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    )
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role') as Role;
      return (
        <Badge variant={role === Role.ADMIN ? 'destructive' : 'default'}>
          {role}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Grade' />
    ),
    cell: ({ row }) => {
      const grade = row.getValue('grade') as Grade;
      return (
        <Badge
          variant={
            grade === Grade.PRO_PLUS
              ? 'destructive'
              : grade === Grade.PRO
                ? 'default'
                : 'secondary'
          }
        >
          {grade}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Dibuat' />
    ),
    cell: ({ row }) => {
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
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta;
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
