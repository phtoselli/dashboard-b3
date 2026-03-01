import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/design-system',
];

// Paths that should redirect to dashboard if already authenticated
const authPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // Check if path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );

  // Check if path is auth-related (login, register, etc.)
  const isAuthPath = authPaths.some(path => pathname === path);

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect root to dashboard if authenticated
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)',
  ],
};
