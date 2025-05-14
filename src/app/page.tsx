import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/auth/sign-in');
  }

  // Cek role user dari Prisma
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true }
  });

  // Redirect berdasarkan role
  if (dbUser?.role === 'ADMIN') {
    redirect('/dashboard');
  } else {
    redirect('/dashboarduser');
  }
}
