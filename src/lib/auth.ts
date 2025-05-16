import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getUserRole() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  return dbUser?.role;
}

export async function redirectBasedOnRole() {
  const role = await getUserRole();

  if (role === 'ADMIN') {
    return '/dashboard';
  } else if (role === 'USER') {
    return '/dashboarduser';
  }

  return '/';
}
