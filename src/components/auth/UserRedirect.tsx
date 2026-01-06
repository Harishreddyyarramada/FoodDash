
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

  // Prevent rendering of auth-gated pages during loading/redirect
  if (isUserLoading && (AUTH_ROUTES.includes(pathname) || PROTECTED_ROUTES.some(r => pathname.startsWith(r)))) {
      return null;
  }
  
  if (!user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return null; // Or a loading spinner
  }

  if(user && AUTH_ROUTES.includes(pathname)) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
