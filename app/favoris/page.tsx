'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrestataireCard from '@/components/PrestataireCard';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { mockPrestataires } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function FavorisPage() {
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !mounted) {
    return null;
  }

  const favoritePrestataires = mockPrestataires.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <FavoriteBorder sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              Mes Favoris
            </Typography>
          </Box>
        </motion.div>

        {favoritePrestataires.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <FavoriteBorder sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Aucun favori pour le moment
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Explorez notre catalogue et ajoutez vos prestataires préférés !
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/services')}
              sx={{ mt: 2 }}
            >
              Découvrir les Services
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
            {favoritePrestataires.map((prestataire, index) => (
              <Box key={prestataire.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PrestataireCard prestataire={prestataire} />
                </motion.div>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}
