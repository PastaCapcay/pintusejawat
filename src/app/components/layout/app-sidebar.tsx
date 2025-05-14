import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUser } from '@/contexts/UserContext';
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
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { IconChevronRight } from '@tabler/icons-react';
import type { LucideIcon } from 'lucide-react';
import {
  Trophy,
  CreditCard,
  UserCircle,
  LogOut,
  GraduationCap,
  History,
  PencilRuler,
  BookOpen
} from 'lucide-react';
import { OrgSwitcher } from '@/components/org-switcher';
import { LayoutDashboard } from 'lucide-react';

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

export default function AppSidebar({
  userGrade
}: {
  userGrade?: 'FREE' | 'STARTER' | 'PRO' | 'PRO_PLUS';
}) {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { user } = useUser();
  const router = useRouter();

  // Filter menu berdasarkan grade
  const getFilteredMenu = (): NavigationItem[] => {
    // Menu untuk dashboard admin (tanpa grade)
    if (!userGrade) {
      return [
        {
          title: 'Dashboard Overview',
          href: '/dashboard',
          icon: LayoutDashboard,
          color: 'text-sky-500'
        },
        {
          title: 'Account',
          href: '/dashboard/profile',
          icon: UserCircle,
          color: 'text-gray-500',
          isActive: true,
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
    }

    // Menu untuk user dashboard (dengan grade)
    const baseMenu = [
      {
        title: 'Dashboard Overview',
        href: '/dashboarduser',
        icon: LayoutDashboard,
        color: 'text-sky-500'
      }
    ];

    // Menu Tryout Gratis untuk semua grade
    const tryoutFreeMenu = {
      title: 'Tryout Gratis',
      href: '/dashboarduser/tryoutfree',
      icon: Trophy,
      color: 'text-yellow-500'
    };

    // Menu Upgrade untuk semua kecuali PRO_PLUS
    const upgradeMenu = {
      title: 'Upgrade Paket',
      href: '/dashboarduser/upgrade',
      icon: CreditCard,
      color: 'text-green-500'
    };

    // Menu Account untuk semua grade
    const accountMenu = {
      title: 'Account',
      href: '/dashboarduser/profile',
      icon: UserCircle,
      color: 'text-gray-500',
      isActive: true,
      items: [
        {
          title: 'Profile',
          href: '/dashboarduser/profile',
          icon: UserCircle,
          shortcut: ['m', 'm']
        },
        {
          title: 'Logout',
          shortcut: ['l', 'l'],
          href: '/auth/sign-in',
          icon: LogOut
        }
      ]
    };

    // Menu Tryout untuk STARTER, PRO, dan PRO_PLUS
    const tryoutMenu = {
      title: 'Tryout',
      href: '/dashboarduser/tryout',
      icon: GraduationCap,
      color: 'text-violet-500',
      items: [
        {
          title: 'Daftar Tryout',
          href: '/dashboarduser/tryout',
          icon: GraduationCap
        },
        {
          title: 'History Tryout',
          href: '/dashboarduser/tryout/history',
          icon: History
        }
      ]
    };

    // Menu Latihan Soal untuk PRO dan PRO_PLUS
    const latsolMenu = {
      title: 'Latihan Soal',
      href: '/dashboarduser/latsoal',
      icon: PencilRuler,
      color: 'text-emerald-500'
    };

    // Menu Materi untuk PRO dan PRO_PLUS
    const materiMenu = {
      title: 'Materi',
      href: '/dashboarduser/materi',
      icon: BookOpen,
      color: 'text-orange-500'
    };

    let filteredMenu = [...baseMenu];

    // Tambahkan menu sesuai grade
    switch (userGrade) {
      case 'FREE':
        filteredMenu.push(tryoutFreeMenu, upgradeMenu);
        break;
      case 'STARTER':
        filteredMenu.push(tryoutFreeMenu, tryoutMenu, upgradeMenu);
        break;
      case 'PRO':
        filteredMenu.push(
          tryoutFreeMenu,
          tryoutMenu,
          latsolMenu,
          materiMenu,
          upgradeMenu
        );
        break;
      case 'PRO_PLUS':
        filteredMenu.push(tryoutFreeMenu, tryoutMenu, latsolMenu, materiMenu);
        break;
    }

    // Tambahkan menu Account di akhir
    filteredMenu.push(accountMenu);

    return filteredMenu;
  };

  const navigationItems = getFilteredMenu();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        {/* Removed OrgSwitcher since it's not needed */}
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
                        title={item.title}
                        isActive={pathname === item.href}
                      >
                        {Icon && <Icon className='size-4' />}
                        <span>{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                title={subItem.title}
                                isActive={pathname === subItem.href}
                                onClick={() => router.push(subItem.href)}
                              >
                                {SubIcon && <SubIcon className='size-4' />}
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
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
                    title={item.title}
                    isActive={pathname === item.href}
                    onClick={() => router.push(item.href)}
                  >
                    {Icon && <Icon className='size-4' />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
