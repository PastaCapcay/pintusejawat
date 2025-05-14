'use client';

import { useClerk } from '@clerk/nextjs';
import { IconLogout } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface LogoutButtonProps {
  variant?: 'default' | 'sidebar' | 'dropdown';
}

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const { signOut } = useClerk();
  const buttonStyles = {
    default: 'w-full justify-start px-2 py-1.5',
    sidebar: 'w-full justify-start px-2 py-1.5',
    dropdown: 'w-full justify-start text-red-600'
  };

  const handleSignOut = async () => {
    try {
      // Hapus cookie session
      document.cookie =
        '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Sign out dari Clerk dengan redirect ke landing page
      await signOut(() => {
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Error signing out:', error);
      // Jika terjadi error, tetap arahkan ke landing page
      window.location.href = '/';
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className={buttonStyles[variant]}>
          <IconLogout className='mr-2 h-4 w-4' />
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan diarahkan ke halaman utama setelah keluar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Keluar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
