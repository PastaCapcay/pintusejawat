import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import UserKBar from '@/components/kbar/user';
import { cookies } from 'next/headers';

export default async function DashboardUserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user?.id) {
    redirect('/auth/sign-in');
  }

  // Cek role dan grade user
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    select: {
      role: true,
      grade: true
    }
  });

  if (dbUser?.role === 'ADMIN') {
    redirect('/dashboard');
  }

  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <UserKBar userGrade={dbUser?.grade || 'FREE'}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userGrade={dbUser?.grade || 'FREE'} />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </UserKBar>
  );
}
