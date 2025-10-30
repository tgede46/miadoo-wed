'use client';

import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Navbar />
      <HomePage />
    </Box>
  );
}
