'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AUTH_ROUTES = ['/login', '/signup'];

export function UserRedirect({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until user status is resolved
    }

    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (user && isAuthRoute) {
      // If user is logged in and on an auth page, redirect to home
      router.replace('/');
    }
  }, [user, isUserLoading, router, pathname]);

  return <>{children}</>;
}
