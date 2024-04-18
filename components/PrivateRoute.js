"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 
    
    if (!session) {
      router.replace('/');
    }
  }, [session, status, router]);

 
  return status === 'loading' ? null : children;
};

export default PrivateRoute;
