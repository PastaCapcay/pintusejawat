import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
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
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect('/auth/sign-in');
  }

  // Cek role dan grade user
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
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
        <div className='relative flex min-h-screen w-full'>
          <AppSidebar userGrade={dbUser?.grade || 'FREE'} />
          <SidebarInset>
            <div className='flex min-h-screen w-full flex-col'>
              <Header />
              <main className='flex-1 overflow-y-auto p-4 md:p-6'>
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserKBar>
  );
}
