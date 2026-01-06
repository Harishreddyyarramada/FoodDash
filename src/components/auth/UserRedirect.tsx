'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_ROUTES = ['/profile', '/orders', '/checkout'];

export function UserRedirect({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until user status is resolved
    }

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    if (user && isAuthRoute) {
      // If user is logged in and on an auth page, redirect to home
      router.replace('/');
    } else if (!user && isProtectedRoute) {
      // If user is not logged in and on a protected page, redirect to login
      router.replace('/login');
    }
  }, [user, isUserLoading, router, pathname]);

  // Prevent protected routes from rendering while redirecting
  if (!user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
