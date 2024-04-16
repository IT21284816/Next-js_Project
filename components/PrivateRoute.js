"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Don't do anything while loading

    // If user is not authenticated, redirect to login page
    if (!session) {
      router.replace('/');
    }
  }, [session, status, router]);

  // If session is loading or user is authenticated, render children
  return status === 'loading' ? null : children;
};

export default PrivateRoute;
