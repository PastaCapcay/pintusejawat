import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useRole() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['user', 'role', userId],
    queryFn: async () => {
      if (!userId) return null;

      const response = await fetch(`/api/user/role?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user role');
      }

      const data = await response.json();
      return data.role;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2
  });
}
