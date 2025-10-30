'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrestataireDashboard from '@/components/PrestataireDashboard';
import { Box } from '@mui/material';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    } else if (user?.role !== 'prestataire') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'prestataire') {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <PrestataireDashboard />
      <Footer />
    </Box>
  );
}
