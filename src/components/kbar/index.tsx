'use client';
import { navItems, navItemsUser } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import RenderResults from './render-result';
import useThemeSwitching from './use-theme-switching';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function KBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Fetch user role when component mounts
    const fetchUserRole = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (!user?.id) return;

        const response = await fetch(`/api/user/role?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, [supabase.auth]);

  // These action are for the navigation
  const actions = useMemo(() => {
    // Determine which navigation items to use based on user role
    const navigationItems = userRole === 'ADMIN' ? navItems : navItemsUser;

    // Define navigateTo inside the useMemo callback to avoid dependency array issues
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

    return navigationItems.flatMap((navItem) => {
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
  }, [router, userRole]); // Add userRole as dependency

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
        <KBarPositioner className='z-99999 p-0! fixed inset-0 bg-background/80 backdrop-blur-sm'>
          <KBarAnimator className='mt-64! -translate-y-12! relative w-full max-w-[600px] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg'>
            <div className='sticky top-0 z-10 border-b border-border bg-card'>
              <KBarSearch className='outline-hidden focus:outline-hidden w-full border-none bg-card px-6 py-4 text-lg focus:ring-0 focus:ring-offset-0' />
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
