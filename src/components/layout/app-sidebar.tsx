'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { getNavItemsByGrade } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
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
import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Grade } from '@prisma/client';
import { Building2, LogOut, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/components/ui/use-toast';

export const company = {
  name: 'IQ Sejawat',
  logo: Building2,
  plan: 'User Dashboard'
};

interface AppSidebarProps {
  userGrade: Grade;
}

export default function AppSidebar({ userGrade }: AppSidebarProps) {
  const pathname = usePathname();
  const { open, toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userName, setUserName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };

    getUser();
  }, [supabase.auth]);

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [open]);

  // Get navigation items based on user grade
  const navigationItems = getNavItemsByGrade(userGrade);

  const handleLogout = async () => {
    try {
      // Ambil deviceId
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
      // Hapus session di Supabase terlebih dahulu
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      // Hapus cookie dan state di client side
      document.cookie =
        'supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie =
        'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie =
        'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      // Clear session storage
      sessionStorage.clear();

      // Clear local storage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.expires_at');
      localStorage.removeItem('supabase.auth.refresh_token');

      router.push('/auth/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat logout. Silakan coba lagi.'
      });

      // Jika terjadi error, tetap coba redirect ke login
      router.push('/auth/sign-in');
      router.refresh();
    }
  };

  const LogoutButton = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton tooltip='Logout' className='w-full'>
          <LogOut className='size-4' />
          <span className='group-data-[collapsible=icon]:hidden'>Logout</span>
        </SidebarMenuButton>
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
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img
              src='/favicon-32x32.png'
              alt='Logo'
              className='size-5 shrink-0'
            />
            <div className='flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden'>
              <span className='truncate text-sm font-medium'>
                {company.name}
              </span>
              <span className='truncate text-xs text-muted-foreground'>
                {company.plan}
              </span>
            </div>
          </div>
          {isMobile && (
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={toggleSidebar}
            >
              <PanelLeft className='h-4 w-4' />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={item.isActive}
                      >
                        {Icon && <Icon className='size-4' />}
                        <span className='group-data-[collapsible=icon]:hidden'>
                          {item.title}
                        </span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              {subItem.title === 'Logout' ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <SidebarMenuSubButton
                                      tooltip='Logout'
                                      isActive={pathname === subItem.href}
                                    >
                                      {SubIcon && (
                                        <SubIcon className='size-4' />
                                      )}
                                      <span className='group-data-[collapsible=icon]:hidden'>
                                        Logout
                                      </span>
                                    </SidebarMenuSubButton>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Konfirmasi Logout
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Apakah Anda yakin ingin keluar dari
                                        sistem?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Batal
                                      </AlertDialogCancel>
                                      <AlertDialogAction onClick={handleLogout}>
                                        Logout
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <Link href={subItem.href}>
                                  <SidebarMenuSubButton
                                    tooltip={subItem.title}
                                    isActive={pathname === subItem.href}
                                  >
                                    {SubIcon && <SubIcon className='size-4' />}
                                    <span className='group-data-[collapsible=icon]:hidden'>
                                      {subItem.title}
                                    </span>
                                  </SidebarMenuSubButton>
                                </Link>
                              )}
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.href}
                    >
                      {Icon && <Icon className='size-4' />}
                      <span className='group-data-[collapsible=icon]:hidden'>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
