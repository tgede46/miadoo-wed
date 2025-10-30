'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import {
  Store,
  Chat,
  Event,
  Verified,
  Star,
  People,
  ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Store sx={{ fontSize: 40 }} />,
      title: 'Large Catalogue',
      description: 'Des centaines de services dans toutes les catégories culturelles',
    },
    {
      icon: <Verified sx={{ fontSize: 40 }} />,
      title: 'Prestataires Certifiés',
      description: 'Tous nos prestataires sont vérifiés et évalués',
    },
    {
      icon: <Chat sx={{ fontSize: 40 }} />,
      title: 'Chat Direct',
      description: 'Échangez directement avec votre prestataire',
    },
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: 'Réservation Simple',
      description: 'Réservez en 2 clics et gérez vos rendez-vous',
    },
  ];

  const stats = [
    { value: '500+', label: 'Prestataires', icon: <People /> },
    { value: '2000+', label: 'Réservations', icon: <Event /> },
    { value: '4.8/5', label: 'Note Moyenne', icon: <Star /> },
  ];

  const categories = [
    { name: 'Coiffure', emoji: '💇', color: '#ff6b6b' },
    { name: 'Beauté', emoji: '💄', color: '#ee5a6f' },
    { name: 'Massage', emoji: '💆', color: '#c56cf0' },
    { name: 'Cuisine', emoji: '👨‍🍳', color: '#ff8c42' },
    { name: 'Artisanat', emoji: '🎨', color: '#3498db' },
    { name: 'Musique', emoji: '🎵', color: '#2ecc71' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff8c42 0%, #ffad70 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '0 2px 20px rgba(0,0,0,0.1)',
                }}
              >
                Bienvenue sur Miadoo
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  mb: 5,
                  opacity: 0.95,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontWeight: 400,
                }}
              >
                La plateforme qui connecte les talents culturels avec ceux qui cherchent leurs services.
                Trouvez le prestataire parfait pour vous !
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mb: 6 }}
              >
                <Button
                  component={Link}
                  href="/services"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explorer les Services
                </Button>
                {isAuthenticated ? (
                  <Button
                    component={Link}
                    href="/mes-reservations"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Mes Réservations
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    href="/auth"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Créer un Compte
                  </Button>
                )}
              </Stack>

              {/* Categories Pills */}
              <Stack
                direction="row"
                spacing={1.5}
                flexWrap="wrap"
                justifyContent="center"
                sx={{ gap: 1.5 }}
              >
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Chip
                      label={`${cat.emoji} ${cat.name}`}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.25)',
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.35)',
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -8, mb: 10, position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            }}
          >
            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
              {stats.map((stat, index) => (
                <Box key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { fontSize: 36 } })}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2 }}
            >
              Pourquoi Miadoo ?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Une expérience simple, sécurisée et efficace pour tous vos besoins culturels
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
            {features.map((feature, index) => (
              <Box key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      p: 3,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(255,140,66,0.15)',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,140,66,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'primary.main',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={700}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10, mt: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom fontWeight={800}>
                Prêt à commencer ?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
              >
                Rejoignez des milliers d&apos;utilisateurs qui font confiance à Miadoo pour leurs services culturels
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  component={Link}
                  href="/services"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  Découvrir les Services
                </Button>
                {!isAuthenticated && (
                  <Button
                    component={Link}
                    href="/auth"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    S&apos;inscrire Gratuitement
                  </Button>
                )}
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
