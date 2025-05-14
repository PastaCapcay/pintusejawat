import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/auth(.*)',
    '/api/webhooks(.*)',
    '/api/user/role',
    '/dashboarduser/profile(.*)'
  ],
  ignoredRoutes: ['/api/webhooks(.*)']
});

export const config = {
  matcher: ['/((?!.*\\.[^/]*$|_next).*)', '/(api|trpc)(.*)']
};
