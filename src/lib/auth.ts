import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function getUserRole() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
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
