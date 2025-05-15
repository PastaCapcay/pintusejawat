'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

// Add type declaration for startViewTransition
interface ViewTransition {
  startViewTransition: (callback: () => void) => void;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newMode = theme === 'light' ? 'dark' : 'light';

    // Type cast document to include startViewTransition
    if ((document as unknown as ViewTransition).startViewTransition) {
      (document as unknown as ViewTransition).startViewTransition(() => {
        setTheme(newMode);
      });
    } else {
      setTheme(newMode);
    }
  };

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme}>
      <Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
      <Moon className='hidden h-5 w-5 dark:block' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}

// Export ModeToggle as an alias for backward compatibility
export const ModeToggle = ThemeToggle;
