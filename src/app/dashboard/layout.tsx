import AdminKBar from '@/components/kbar/admin';
import AdminSidebar from '@/components/layout/admin-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({
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

  // Cek role user
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      role: true
    }
  });

  if (dbUser?.role !== 'ADMIN') {
    redirect('/dashboarduser');
  }

  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <AdminKBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className='relative flex min-h-screen w-full'>
          <AdminSidebar />
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
    </AdminKBar>
  );
}
