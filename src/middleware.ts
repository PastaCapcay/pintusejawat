import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/auth(.*)',
    '/api/webhooks(.*)',
    '/api/user/role',
    '/dashboarduser/profile(.*)'
  ],
  ignoredRoutes: ['/api/webhooks(.*)'],
  async afterAuth(auth, req) {
    // Skip pengecekan untuk public routes
    if (!auth.userId || req.url.includes('/api/webhooks')) {
      return;
    }

    try {
      // Ambil current session dari cookie
      const currentSession = req.cookies.get('current_session')?.value;

      // Jika ada session di cookie dan berbeda dengan session saat ini
      if (currentSession && currentSession !== auth.sessionId) {
        console.log(
          `[SESSION_CONFLICT] User ${auth.userId} has conflicting sessions:`,
          {
            cookieSession: currentSession,
            currentSession: auth.sessionId
          }
        );

        // Force logout dengan redirect
        const response = NextResponse.redirect(
          new URL('/auth/sign-in', req.url)
        );
        response.cookies.set('current_session', '', {
          expires: new Date(0),
          path: '/'
        });
        return response;
      }

      // Set session baru di cookie
      const response = NextResponse.next();
      response.cookies.set('current_session', auth.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      return response;
    } catch (error) {
      console.error('Error checking session:', error);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\.[^/]*$|_next).*)', '/(api|trpc)(.*)']
};
