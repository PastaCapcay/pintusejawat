'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  name: string;
  email: string;
  imageUrl?: string;
}

export function UserNav(): JSX.Element | null {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUserData({
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          imageUrl: user.user_metadata?.avatar_url
        });
      }
    };

    getUser();
  }, [supabase.auth]);

  if (!userData) return null;

  const handleLogout = async () => {
    try {
      const deviceId =
        typeof window !== 'undefined' ? localStorage.getItem('deviceId') : '';
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user && deviceId) {
        await fetch('/api/user-session', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, deviceId })
        });
      }
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat logout. Silakan coba lagi.'
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile
            user={{
              fullName: userData.name,
              imageUrl: userData.imageUrl,
              emailAddresses: [{ emailAddress: userData.email }]
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{userData.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {userData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/dashboarduser/profile')}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className='text-red-600'
              onSelect={(e) => e.preventDefault()}
            >
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin keluar dari sistem?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
