'use client';

import { navItems } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import RenderResults from './render-result';
import useThemeSwitching from './use-theme-switching';

export default function AdminKBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // These action are for the navigation
  const actions = useMemo(() => {
    const navigateTo = (path: string) => {
      try {
        if (!path) {
          console.error('Navigation path is undefined');
          return;
        }

        // Ensure path is a string and starts with /
        const safePath = typeof path === 'string' ? path : String(path);
        const normalizedPath = safePath.startsWith('/')
          ? safePath
          : `/${safePath}`;

        // Remove any potential double slashes and clean the path
        const cleanPath = normalizedPath.replace(/\/+/g, '/');

        console.log('Navigating to:', cleanPath); // Debug log
        router.push(cleanPath);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    };

    return navItems.flatMap((navItem) => {
      // Only include base action if the navItem has a real URL and is not just a container
      const baseAction =
        navItem.href && navItem.href !== '#'
          ? {
              id: `${navItem.title.toLowerCase()}Action`,
              name: navItem.title,
              shortcut: navItem.shortcut,
              keywords: navItem.title.toLowerCase(),
              section: 'Navigation',
              subtitle: `Go to ${navItem.title}`,
              perform: () => {
                console.log('Base action href:', navItem.href); // Debug log
                navigateTo(navItem.href);
              }
            }
          : null;

      // Map child items into actions
      const childActions =
        navItem.items
          ?.map((childItem) =>
            childItem.href
              ? {
                  id: `${childItem.title.toLowerCase()}Action`,
                  name: childItem.title,
                  shortcut: childItem.shortcut,
                  keywords: childItem.title.toLowerCase(),
                  section: navItem.title,
                  subtitle: `Go to ${childItem.title}`,
                  perform: () => {
                    console.log('Child action href:', childItem.href); // Debug log
                    navigateTo(childItem.href);
                  }
                }
              : null
          )
          .filter(
            (action): action is NonNullable<typeof action> => action !== null
          ) ?? [];

      // Return only valid actions (ignoring null base actions for containers)
      return baseAction ? [baseAction, ...childActions] : childActions;
    });
  }, [router]);

  return (
    <KBarProvider actions={actions}>
      <KBarComponent>{children}</KBarComponent>
    </KBarProvider>
  );
}

const KBarComponent = ({ children }: { children: React.ReactNode }) => {
  useThemeSwitching();

  return (
    <>
      <KBarPortal>
        <KBarPositioner className='bg-background/80 fixed inset-0 z-99999 p-0! backdrop-blur-sm'>
          <KBarAnimator className='bg-card text-card-foreground relative mt-64! w-full max-w-[600px] -translate-y-12! overflow-hidden rounded-lg border shadow-lg'>
            <div className='bg-card border-border sticky top-0 z-10 border-b'>
              <KBarSearch className='bg-card w-full border-none px-6 py-4 text-lg outline-hidden focus:ring-0 focus:ring-offset-0 focus:outline-hidden' />
            </div>
            <div className='max-h-[400px]'>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
