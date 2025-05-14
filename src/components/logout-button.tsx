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
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  variant?: 'default' | 'sidebar' | 'dropdown';
}

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const buttonStyles = {
    default: 'w-full justify-start px-2 py-1.5',
    sidebar: 'w-full justify-start px-2 py-1.5',
    dropdown: 'w-full justify-start text-red-600'
  };

  const handleSignOut = () => {
    signOut(() => router.push('/auth/sign-in'));
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
            Anda akan diarahkan ke halaman login setelah keluar.
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
