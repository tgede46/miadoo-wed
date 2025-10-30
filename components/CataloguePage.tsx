'use client';

import React, { useState } from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import PrestataireCard from '@/components/PrestataireCard';
import { mockPrestataires } from '@/data/mockData';
import { ServiceCategory } from '@/types';
import { motion } from 'framer-motion';

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  const filteredPrestataires = mockPrestataires.filter((prestataire) => {
    const matchesSearch =
      prestataire.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prestataire.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || prestataire.category === categoryFilter;

    const matchesPrice =
      prestataire.price >= priceRange[0] && prestataire.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Découvrez nos prestataires
        </Typography>
      </motion.div>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '5fr 3fr 4fr' }, alignItems: 'center' }}>
          <Box>
            <TextField
              fullWidth
              placeholder="Rechercher un prestataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={categoryFilter}
                label="Catégorie"
                onChange={(e) => setCategoryFilter(e.target.value as ServiceCategory | 'all')}
              >
                <MenuItem value="all">Toutes les catégories</MenuItem>
                <MenuItem value="coiffure">Coiffure</MenuItem>
                <MenuItem value="beauté">Beauté</MenuItem>
                <MenuItem value="massage">Massage</MenuItem>
                <MenuItem value="cuisine">Cuisine</MenuItem>
                <MenuItem value="artisanat">Artisanat</MenuItem>
                <MenuItem value="musique">Musique</MenuItem>
                <MenuItem value="autre">Autre</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="body2" gutterBottom>
              Prix : {priceRange[0]}€ - {priceRange[1]}€
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </Paper>

      {filteredPrestataires.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun prestataire ne correspond à votre recherche
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' } }}>
          {filteredPrestataires.map((prestataire, index) => (
            <Box key={prestataire.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <PrestataireCard prestataire={prestataire} />
              </motion.div>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
