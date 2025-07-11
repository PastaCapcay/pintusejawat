'use client';

import { getNavItemsByGrade } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
  Action,
  useKBar
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import RenderResults from './render-result';
import { Grade } from '@prisma/client';

import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';

interface UserKBarProps {
  children: React.ReactNode;
  userGrade: Grade;
}

export default function UserKBar({ children, userGrade }: UserKBarProps) {
  const router = useRouter();
  const { query } = useKBar();

  const actions = useMemo(() => {
    const navigationItems = getNavItemsByGrade(userGrade);
    const kbarActions: Action[] = [];

    navigationItems.forEach((item) => {
      if (item.title === 'Tryout Gratis') {
        kbarActions.push({
          id: item.href,
          name: item.title,
          shortcut: [],
          keywords: item.title.toLowerCase(),
          perform: () => router.push(item.href),
          section: 'Akses Cepat'
        });
      } else if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.title !== 'Logout') {
            kbarActions.push({
              id: subItem.href,
              name: subItem.title,
              shortcut: subItem.shortcut || [],
              keywords: `${item.title.toLowerCase()} ${subItem.title.toLowerCase()}`,
              perform: () => router.push(subItem.href),
              section: item.title
            });
          }
        });
      } else {
        kbarActions.push({
          id: item.href,
          name: item.title,
          shortcut: [],
          keywords: item.title.toLowerCase(),
          perform: () => router.push(item.href)
        });
      }
    });

    return kbarActions;
  }, [router, userGrade, query]);

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className='z-50 bg-black/50 p-4'>
            <KBarAnimator className='w-full max-w-xl rounded-lg bg-popover text-popover-foreground shadow-lg'>
              <KBarSearch className='w-full bg-transparent px-4 py-3 text-sm outline-none' />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {children}
      </KBarProvider>
    </>
  );
}
