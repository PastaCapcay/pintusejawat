'use client';

import { getNavItemsByGrade } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
  Action
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import RenderResults from './render-result';
import useThemeSwitching from './use-theme-switching';
import { Grade } from '@prisma/client';

interface UserKBarProps {
  children: React.ReactNode;
  userGrade: Grade;
}

export default function UserKBar({ children, userGrade }: UserKBarProps) {
  const router = useRouter();

  const actions = useMemo(() => {
    const navigationItems = getNavItemsByGrade(userGrade);
    const kbarActions: Action[] = [];

    // Konversi menu items menjadi kbar actions
    navigationItems.forEach((item) => {
      if (item.items) {
        // Jika item memiliki submenu, buat section untuk grouping
        const sectionAction: Action = {
          id: item.href,
          name: item.title,
          shortcut: [],
          keywords: item.title.toLowerCase(),
          section: item.title
        };
        kbarActions.push(sectionAction);

        // Tambahkan submenu items
        item.items.forEach((subItem) => {
          if (subItem.title !== 'Logout') {
            const subAction: Action = {
              id: subItem.href,
              name: subItem.title,
              shortcut: subItem.shortcut || [],
              keywords: `${item.title.toLowerCase()} ${subItem.title.toLowerCase()}`,
              perform: () => router.push(subItem.href),
              section: item.title
            };
            kbarActions.push(subAction);
          }
        });
      } else {
        // Item tanpa submenu
        const mainAction: Action = {
          id: item.href,
          name: item.title,
          shortcut: [],
          keywords: item.title.toLowerCase(),
          perform: () => router.push(item.href)
        };
        kbarActions.push(mainAction);
      }
    });

    return kbarActions;
  }, [router, userGrade]);

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className='z-50 bg-black/50 p-4'>
          <KBarAnimator className='bg-popover text-popover-foreground w-full max-w-xl rounded-lg shadow-lg'>
            <KBarSearch className='w-full bg-transparent px-4 py-3 text-sm outline-none' />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}
