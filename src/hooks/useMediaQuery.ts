'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsOpen(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsOpen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isOpen };
}
