'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { Service, ServiceCategory } from '@/types';
import { mockServices, mockOrders } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function PrestataireDashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState(mockServices.filter((s) => s.prestataireId === user?.id));
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'coiffure' as ServiceCategory,
    price: '',
    duration: '',
  });

  const userOrders = mockOrders.filter((o) => o.prestataireId === user?.id);

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        price: service.price.toString(),
        duration: service.duration.toString(),
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        category: 'coiffure',
        price: '',
        duration: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingService(null);
  };

  const handleSaveService = () => {
    if (!user) return;

    const serviceData: Service = {
      id: editingService?.id || `serv-${Date.now()}`,
      prestataireId: user.id,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      media: editingService?.media || [],
    };

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? serviceData : s)));
    } else {
      setServices([...services, serviceData]);
    }

    handleCloseDialog();
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
  };

  const statusColors: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
    pending: 'warning',
    confirmed: 'default',
    completed: 'success',
    cancelled: 'error',
  };

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    completed: 'Terminée',
    cancelled: 'Annulée',
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Mon Dashboard
        </Typography>
      </motion.div>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, mt: 2 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Services actifs
              </Typography>
              <Typography variant="h3" color="primary">
                {services.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Demandes reçues
              </Typography>
              <Typography variant="h3" color="primary">
                {userOrders.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Revenus totaux
              </Typography>
              <Typography variant="h3" color="primary">
                {userOrders.reduce((sum, o) => sum + o.totalPrice, 0)}€
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Mes Services
              </Typography>
              <Button startIcon={<Add />} variant="contained" onClick={() => handleOpenDialog()}>
                Ajouter un service
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
              {services.map((service) => (
                <Box key={service.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6">{service.name}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {service.description}
                          </Typography>
                          <Chip label={service.category} size="small" sx={{ mr: 1 }} />
                          <Typography variant="h6" color="primary" component="span">
                            {service.price}€
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            • {service.duration} min
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" onClick={() => handleOpenDialog(service)}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteService(service.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Demandes reçues
            </Typography>
            <List>
              {userOrders.map((order) => {
                const service = mockServices.find((s) => s.id === order.serviceId);
                return (
                  <ListItem
                    key={order.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={service?.name}
                      secondary={`Date: ${order.date.toLocaleDateString('fr-FR')} • ${order.totalPrice}€`}
                    />
                    <Chip label={statusLabels[order.status]} color={statusColors[order.status]} />
                  </ListItem>
                );
              })}
              {userOrders.length === 0 && (
                <Typography color="text.secondary" align="center">
                  Aucune demande pour le moment
                </Typography>
              )}
            </List>
          </Paper>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingService ? 'Modifier le service' : 'Nouveau service'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom du service"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            select
            fullWidth
            label="Catégorie"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
            margin="normal"
            required
          >
            <MenuItem value="coiffure">Coiffure</MenuItem>
            <MenuItem value="beauté">Beauté</MenuItem>
            <MenuItem value="massage">Massage</MenuItem>
            <MenuItem value="cuisine">Cuisine</MenuItem>
            <MenuItem value="artisanat">Artisanat</MenuItem>
            <MenuItem value="musique">Musique</MenuItem>
            <MenuItem value="autre">Autre</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Prix (€)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Durée (minutes)"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSaveService} variant="contained">
            {editingService ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
