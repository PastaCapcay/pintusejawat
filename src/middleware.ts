import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

// Daftar rute yang bisa diakses tanpa login
const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up', '/auth/callback'];

// Daftar asset statis yang harus diabaikan
const staticAssets = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico'];

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

  try {
    // Ambil role dari API endpoint
    console.log('Middleware - Getting user role...');
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      `http://${request.headers.get('host')}`;
    const roleResponse = await fetch(
      `${baseUrl}/api/user/role?userId=${session.user.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!roleResponse.ok) {
      console.error(
        'Middleware - Failed to fetch role:',
        await roleResponse.text()
      );
      return res;
    }

    const { role } = await roleResponse.json();

    if (!role) {
      console.error('Middleware - No role found for user');
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/sign-in';
      return NextResponse.redirect(redirectUrl);
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
      console.log(
        'Middleware - Allowing access to dashboarduser - Regular user'
      );
      return res;
    }

    // Jika admin mencoba akses /dashboard, biarkan
    if (path.startsWith('/dashboard') && isAdmin) {
      console.log('Middleware - Allowing access to dashboard - Admin user');
      return res;
    }

    return res;
  } catch (error) {
    console.error('Middleware - Error checking session:', error);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/sign-in';
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
