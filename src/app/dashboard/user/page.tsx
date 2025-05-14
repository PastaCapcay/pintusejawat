'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { UserColumn } from './columns';

export default function UserPage() {
  const [users, setUsers] = useState<UserColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Manajemen User</h2>
          <p className='text-muted-foreground'>
            Kelola user dan hak aksesnya di sini
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onRefresh={fetchUsers}
      />
    </div>
  );
}
