import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-14 items-center justify-between'>
        <div className='flex items-center gap-4 px-4'>
          <SidebarTrigger className='-ml-2' />
          <Separator orientation='vertical' className='h-6' />
          <Breadcrumbs />
        </div>

        <div className='flex items-center gap-4 px-4'>
          <div className='hidden md:flex'>
            <SearchInput />
          </div>
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
