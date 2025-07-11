import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

// Daftar rute yang bisa diakses tanpa login
const publicRoutes = [
  '/',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/callback',
  '/manifest.json',
  '/favicon.ico',
  '/site.webmanifest'
];

// Daftar asset statis yang harus diabaikan
const staticAssets = [
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.ico',
  '.json',
  '.js',
  '.css',
  '.woff',
  '.woff2'
];

// Cache untuk menyimpan role per userId dengan TTL 5 menit
const roleCache = new Map<string, { role: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 menit dalam milidetik

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const path = request.nextUrl.pathname;

  // Abaikan asset statis dan API routes
  if (
    staticAssets.some((ext) => path.endsWith(ext)) ||
    path.startsWith('/_next') ||
    path.startsWith('/api')
  ) {
    return res;
  }

  // Jika path adalah public route, izinkan akses
  if (publicRoutes.some((route) => path === route)) {
    return res;
  }

  try {
    const supabase = createMiddlewareClient({ req: request, res });
    const {
      data: { session }
    } = await supabase.auth.getSession();

    // Jika tidak ada session sama sekali, redirect ke login
    if (!session?.user?.id) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/sign-in';
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Ambil deviceId dari cookie
    const deviceId = request.cookies.get('device_id')?.value;

    // Jika tidak ada deviceId, redirect ke login
    if (!deviceId) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/sign-in';
      redirectUrl.searchParams.set('error', 'no_device_id');
      return NextResponse.redirect(redirectUrl);
    }

    // Cek role dari cache dengan validasi TTL
    const cachedData = roleCache.get(session.user.id);
    let role = null;

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      role = cachedData.role;
    } else {
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

        // Update cache dengan timestamp
        if (role) {
          roleCache.set(session.user.id, {
            role,
            timestamp: Date.now()
          });
        }
      } catch (error) {
        console.error('Error fetching role:', error);
        // Jika error saat cek role, tetap izinkan akses
        return res;
      }
    }

    const isAdmin = role === Role.ADMIN;

    // Redirect berdasarkan role
    if (path === '/dashboard' && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboarduser', request.url));
    }

    if (path === '/dashboarduser' && isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Jika user biasa mencoba akses /dashboarduser, biarkan
    if (path.startsWith('/dashboarduser') && !isAdmin) {
      return res;
    }

    // Jika admin mencoba akses /dashboard, biarkan
    if (path.startsWith('/dashboard') && isAdmin) {
      return res;
    }

    return res;
  } catch (error) {
    console.error('Error in middleware:', error);
    // Jika terjadi error di middleware, tetap izinkan akses
    return res;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
