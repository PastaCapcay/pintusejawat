import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Cache untuk menyimpan role per userId
const roleCache = new Map<string, string>();

export function useRole() {
  const supabase = createClientComponentClient();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user?.id) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Cek cache dulu
        if (roleCache.has(user.id)) {
          setRole(roleCache.get(user.id) || null);
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/user/role?userId=${user.id}`);
        const data = await response.json();

        if (response.ok) {
          // Simpan ke cache
          roleCache.set(user.id, data.role);
          setRole(data.role);
        } else {
          throw new Error(data.error || 'Failed to fetch role');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [supabase.auth]);

  return { role, loading, error };
}
