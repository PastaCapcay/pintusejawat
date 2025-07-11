import {
  LayoutDashboard,
  Users,
  BookCopy,
  BookOpen,
  UserCircle,
  LogOut,
  PencilRuler,
  GraduationCap,
  History,
  Trophy,
  CreditCard
} from 'lucide-react';
import { Grade } from '@prisma/client';

type LucideIconType = React.ComponentType<
  React.ComponentProps<typeof UserCircle>
>;

interface NavigationSubItem {
  title: string;
  href: string;
  icon: LucideIconType;
  shortcut?: string[];
}

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIconType;
  color?: string;
  isActive?: boolean;
  shortcut?: string[];
  items?: NavigationSubItem[];
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: Users,
    color: 'text-violet-500'
  },
  {
    title: 'Soal',
    href: '/dashboard/soal',
    icon: BookCopy,
    color: 'text-pink-500'
  },
  {
    title: 'Materi',
    href: '/dashboard/materi',
    icon: BookOpen,
    color: 'text-green-500'
  },
  {
    title: 'Account',
    href: '/dashboard/profile',
    icon: UserCircle,
    isActive: true,
    items: [
      {
        title: 'Profile',
        href: '/dashboard/profile',
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
  }
];

export const navItemsUser: NavigationItem[] = [
  {
    title: 'Dashboard Overview',
    href: '/dashboarduser',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  },
  {
    title: 'Latihan Soal',
    href: '/dashboarduser/latsoal',
    icon: PencilRuler,
    color: 'text-emerald-500'
  },
  {
    title: 'Materi',
    href: '/dashboarduser/materi',
    icon: BookOpen,
    color: 'text-orange-500'
  },
  {
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
  },
  {
    title: 'Tryout Gratis',
    href: '/dashboarduser/tryoutfree',
    icon: Trophy,
    color: 'text-yellow-500'
  },
  {
    title: 'Upgrade Paket',
    href: '/dashboarduser/upgrade',
    icon: CreditCard,
    color: 'text-green-500'
  },
  {
    title: 'Account',
    href: '/dashboarduser/profile',
    icon: UserCircle,
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
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

export const getNavItemsByGrade = (grade: Grade): NavigationItem[] => {
  // Menu Dashboard Overview untuk semua grade
  const dashboardMenu: NavigationItem = {
    title: 'Dashboard Overview',
    href: '/dashboarduser',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  };

  // Menu Tryout Gratis untuk semua grade
  const tryoutFreeMenu: NavigationItem = {
    title: 'Tryout UKAI Gratis',
    href: '/dashboarduser/tryoutfree',
    icon: Trophy,
    color: 'text-yellow-500'
  };

  // Menu Tryout dengan submenu untuk STARTER, PRO, dan PRO_PLUS
  const tryoutMenu: NavigationItem = {
    title: 'Tryout UKAI',
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
  const latsolMenu: NavigationItem = {
    title: 'Bank Soal UKAI',
    href: '/dashboarduser/latsoal',
    icon: PencilRuler,
    color: 'text-emerald-500'
  };

  // Menu Materi untuk PRO dan PRO_PLUS
  const materiMenu: NavigationItem = {
    title: 'Materi UKAI',
    href: '/dashboarduser/materi',
    icon: BookOpen,
    color: 'text-orange-500'
  };

  // Menu Upgrade untuk semua kecuali PRO_PLUS
  const upgradeMenu: NavigationItem = {
    title: 'Upgrade Paket',
    href: '/dashboarduser/upgrade',
    icon: CreditCard,
    color: 'text-green-500'
  };

  // Menu Account untuk semua grade
  const accountMenu: NavigationItem = {
    title: 'Account',
    href: '/dashboarduser/profile',
    icon: UserCircle,
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

  // Menyusun menu berdasarkan grade
  let menuItems: NavigationItem[] = [];

  switch (grade) {
    case 'FREE':
      menuItems = [dashboardMenu, tryoutFreeMenu, upgradeMenu, accountMenu];
      break;
    case 'STARTER':
      menuItems = [dashboardMenu, tryoutMenu, upgradeMenu, accountMenu];
      break;
    case 'PRO':
      menuItems = [
        dashboardMenu,
        tryoutMenu,
        latsolMenu,
        materiMenu,
        upgradeMenu,
        accountMenu
      ];
      break;
    case 'PRO_PLUS':
      menuItems = [
        dashboardMenu,
        tryoutMenu,
        latsolMenu,
        materiMenu,
        accountMenu
      ];
      break;
    default:
      menuItems = [dashboardMenu, tryoutFreeMenu, upgradeMenu, accountMenu];
  }

  return menuItems;
};
