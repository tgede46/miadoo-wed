'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CataloguePage from '@/components/CataloguePage';
import { Box } from '@mui/material';

export default function ServicesPage() {
  return (
    <Box>
      <Navbar />
      <CataloguePage />
      <Footer />
    </Box>
  );
}
