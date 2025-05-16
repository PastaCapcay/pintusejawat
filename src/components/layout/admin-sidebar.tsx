'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { IconChevronRight } from '@tabler/icons-react';
import type { LucideIcon } from 'lucide-react';
import {
  UserCircle,
  LogOut,
  PencilRuler,
  BookOpen,
  LayoutDashboard,
  Building2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isActive?: boolean;
  items?: {
    title: string;
    href: string;
    icon: LucideIcon;
    shortcut?: string[];
  }[];
}

export const company = {
  name: 'Pintu Sejawat',
  logo: Building2,
  plan: 'Admin Dashboard'
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const navigationItems: NavigationItem[] = [
    {
      title: 'Dashboard Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      color: 'text-primary'
    },
    {
      title: 'Manajemen User',
      href: '/dashboard/user',
      icon: UserCircle,
      color: 'text-primary'
    },
    {
      title: 'Manajemen Materi',
      href: '/dashboard/materi',
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Manajemen Soal',
      href: '/dashboard/soal',
      icon: PencilRuler,
      color: 'text-primary'
    },
    {
      title: 'Account',
      href: '/dashboard/profile',
      icon: UserCircle,
      color: 'text-muted-foreground',
      isActive: pathname.startsWith('/dashboard/profile'),
      items: [
        {
          title: 'Profile',
          href: '/dashboard/profile',
          icon: UserCircle
        },
        {
          title: 'Logout',
          href: '/auth/sign-in',
          icon: LogOut
        }
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      // Hapus session di Supabase
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

      // Hapus session di server
      await fetch('/api/auth/session', {
        method: 'DELETE',
        credentials: 'include'
      });

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
        <div className='flex items-center gap-2 px-2 py-4'>
          <img
            src='/favicon-32x32.png'
            alt='Logo'
            className='size-5 shrink-0'
          />
          <div className='flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden'>
            <span className='text-sm font-medium text-foreground'>
              {company.name}
            </span>
            <span className='text-xs text-muted-foreground'>
              {company.plan}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={item.isActive}
                      >
                        {Icon && (
                          <Icon
                            className={`size-4 ${item.color || 'text-muted-foreground'}`}
                          />
                        )}
                        <span className='group-data-[collapsible=icon]:hidden'>
                          {item.title}
                        </span>
                        <IconChevronRight className='ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              {subItem.title === 'Logout' ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <SidebarMenuSubButton
                                      tooltip={subItem.title}
                                      className='text-destructive'
                                    >
                                      {SubIcon && (
                                        <SubIcon className='size-4' />
                                      )}
                                      <span className='group-data-[collapsible=icon]:hidden'>
                                        {subItem.title}
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
                      {Icon && (
                        <Icon
                          className={`size-4 ${item.color || 'text-muted-foreground'}`}
                        />
                      )}
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
