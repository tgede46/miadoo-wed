'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Category,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ServiceCategory {
  id: string;
  name: string;
  color: string;
  count: number;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<ServiceCategory[]>([
    { id: '1', name: 'Coiffure', color: '#9c27b0', count: 15 },
    { id: '2', name: 'Beauté', color: '#e91e63', count: 12 },
    { id: '3', name: 'Massage', color: '#00bcd4', count: 8 },
    { id: '4', name: 'Cuisine', color: '#ff9800', count: 10 },
    { id: '5', name: 'Artisanat', color: '#795548', count: 6 },
    { id: '6', name: 'Musique', color: '#3f51b5', count: 5 },
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#000000' });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: ServiceCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        color: newCategory.color,
        count: 0,
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', color: '#000000' });
      setOpenDialog(false);
    }
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, color: category.color });
    setOpenDialog(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.name.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategory.name, color: newCategory.color }
          : cat
      ));
      setNewCategory({ name: '', color: '#000000' });
      setEditingCategory(null);
      setOpenDialog(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setNewCategory({ name: '', color: '#000000' });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            🏷️ Gestion des catégories
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {categories.length} catégories de services
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          size="small"
        >
          Nouvelle catégorie
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Paper
                sx={{
                  p: 2,
                  border: 2,
                  borderColor: category.color,
                  '&:hover': { boxShadow: 6 },
                  transition: 'all 0.3s',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Category sx={{ color: category.color }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {category.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.count} service(s)
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Chip
                  label={category.color}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: category.color,
                    color: 'white',
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Dialog pour ajouter/modifier une catégorie */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Nom de la catégorie"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              autoFocus
            />
            <Box>
              <Typography variant="body2" gutterBottom>
                Couleur
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  style={{ width: 60, height: 40, border: 'none', cursor: 'pointer' }}
                />
                <TextField
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button
            variant="contained"
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            disabled={!newCategory.name.trim()}
          >
            {editingCategory ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
