'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Prestataire } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';

interface PrestataireCardProps {
  prestataire: Prestataire;
}

const categoryColors: Record<string, string> = {
  coiffure: '#9c27b0',
  beauté: '#e91e63',
  massage: '#00bcd4',
  cuisine: '#ff9800',
  artisanat: '#795548',
  musique: '#3f51b5',
  autre: '#607d8b',
};

export default function PrestataireCard({ prestataire }: PrestataireCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated, user } = useAuth();

  const handleClick = () => {
    router.push(`/prestataire/${prestataire.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated && user?.role === 'client') {
      toggleFavorite(prestataire.id);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 320,
          position: 'relative',
        }}
      >
        {/* Bouton Favori - Visible uniquement pour les clients authentifiés */}
        {isAuthenticated && user?.role === 'client' && (
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255,255,255,0.9)',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
              },
            }}
          >
            {isFavorite(prestataire.id) ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        )}

        <CardMedia
          component="img"
          height="120"
          image={prestataire.media[0]?.url || 'https://via.placeholder.com/400x200'}
          alt={prestataire.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontSize: '0.95rem', fontWeight: 600 }}>
              {prestataire.name}
            </Typography>
            {prestataire.culturalBadge && (
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{prestataire.culturalBadge}</Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.8 }}>
            <Rating value={prestataire.rating || 0} precision={0.1} size="small" readOnly sx={{ fontSize: '1rem' }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              ({prestataire.reviewCount || 0})
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.8rem',
              lineHeight: 1.3,
            }}
          >
            {prestataire.description}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={prestataire.category}
              size="small"
              sx={{
                bgcolor: categoryColors[prestataire.category] || '#607d8b',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: '22px',
              }}
            />
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
              {prestataire.price}€
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
