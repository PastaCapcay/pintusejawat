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
import { useUser } from '@clerk/nextjs';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle
} from '@tabler/icons-react';
import { SignOutButton } from '@clerk/nextjs';
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
import { LogoutButton } from '@/components/logout-button';
import { LucideIcon } from 'lucide-react';
import { Grade } from '@prisma/client';
import { Building2, LogOut } from 'lucide-react';

export const company = {
  name: 'Pintu Sejawat',
  logo: Building2,
  plan: 'User Dashboard'
};

interface AppSidebarProps {
  userGrade: Grade;
}

export default function AppSidebar({ userGrade }: AppSidebarProps) {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  // Get navigation items based on user grade
  const navigationItems = getNavItemsByGrade(userGrade);

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
