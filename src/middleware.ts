import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

// Daftar rute yang bisa diakses tanpa login
const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up', '/auth/callback'];

// Daftar asset statis yang harus diabaikan
const staticAssets = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico'];

// Cache untuk menyimpan role per userId
const roleCache = new Map<string, string>();

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const path = request.nextUrl.pathname;

  // Abaikan asset statis
  if (staticAssets.some((ext) => path.endsWith(ext))) {
    console.log('Middleware - Ignoring static asset:', path);
    return res;
  }

  const supabase = createMiddlewareClient({ req: request, res });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  console.log('Middleware - Request path:', path);
  console.log('Middleware - Session:', {
    userId: session?.user?.id,
    hasAccessToken: !!session?.access_token
  });

  // Jika path adalah public route, izinkan akses
  if (publicRoutes.includes(path)) {
    console.log('Middleware - Allowing access to public route');
    return res;
  }

  // Jika tidak ada session sama sekali, redirect ke login
  if (!session?.user?.id) {
    console.log('Middleware - No session, redirecting to login');
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/sign-in';
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Cek role dari cache dulu
  let role = roleCache.get(session.user.id);

  // Jika tidak ada di cache, fetch dari API
  if (!role) {
    try {
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(
        `${baseUrl}/api/user/role?userId=${session.user.id}`,
        {
          headers: request.headers
        }
      );
      const data = await response.json();
      role = data.role;

      // Simpan ke cache
      if (role) {
        roleCache.set(session.user.id, role);
      }
    } catch (error) {
      console.error('Error fetching role:', error);
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  console.log('Middleware - User data:', {
    userId: session.user.id,
    role: role,
    path: path
  });

  const isAdmin = role === Role.ADMIN;

  // Redirect berdasarkan role
  if (path === '/dashboard' && !isAdmin) {
    console.log('Middleware - Redirecting to dashboarduser - Not admin');
    return NextResponse.redirect(new URL('/dashboarduser', request.url));
  }

  if (path === '/dashboarduser' && isAdmin) {
    console.log('Middleware - Redirecting to dashboard - Is admin');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika user biasa mencoba akses /dashboarduser, biarkan
  if (path.startsWith('/dashboarduser') && !isAdmin) {
    console.log('Middleware - Allowing access to dashboarduser - Regular user');
    return res;
  }

  // Jika admin mencoba akses /dashboard, biarkan
  if (path.startsWith('/dashboard') && isAdmin) {
    console.log('Middleware - Allowing access to dashboard - Admin user');
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
