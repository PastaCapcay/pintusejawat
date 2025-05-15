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
import { SignOutButton } from '@clerk/nextjs';

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

  const navigationItems: NavigationItem[] = [
    {
      title: 'Dashboard Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      color: 'text-sky-500'
    },
    {
      title: 'Manajemen User',
      href: '/dashboard/user',
      icon: UserCircle,
      color: 'text-violet-500'
    },
    {
      title: 'Manajemen Materi',
      href: '/dashboard/materi',
      icon: BookOpen,
      color: 'text-orange-500'
    },
    {
      title: 'Manajemen Soal',
      href: '/dashboard/soal',
      icon: PencilRuler,
      color: 'text-emerald-500'
    },
    {
      title: 'Account',
      href: '/dashboard/profile',
      icon: UserCircle,
      color: 'text-gray-500',
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
          <AlertDialogAction asChild>
            <SignOutButton
              signOutCallback={() => router.push('/auth/sign-in')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-2 py-4'>
          <company.logo className='size-5 shrink-0' />
          <div className='flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden'>
            <span className='text-sm font-medium'>{company.name}</span>
            <span className='text-muted-foreground text-xs'>
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
                                      <AlertDialogAction asChild>
                                        <SignOutButton
                                          signOutCallback={() =>
                                            router.push('/auth/sign-in')
                                          }
                                        />
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <SidebarMenuSubButton
                                  tooltip={subItem.title}
                                  isActive={pathname === subItem.href}
                                  onClick={() => router.push(subItem.href)}
                                >
                                  {SubIcon && <SubIcon className='size-4' />}
                                  <span className='group-data-[collapsible=icon]:hidden'>
                                    {subItem.title}
                                  </span>
                                </SidebarMenuSubButton>
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
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.href}
                    onClick={() => router.push(item.href)}
                  >
                    {Icon && <Icon className='size-4' />}
                    <span className='group-data-[collapsible=icon]:hidden'>
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
