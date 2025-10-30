'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import { Edit, Save, Cancel, PhotoCamera, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ProfilPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    photo: (user as { photo?: string })?.photo || '',
    description: (user as { description?: string })?.description || '',
  });
  const [photoPreview, setPhotoPreview] = useState<string>((user as { photo?: string })?.photo || '');
  
  // Type pour les heures de service
  type BusinessHours = {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };

  // Heures de service pour les prestataires
  const defaultBusinessHours: BusinessHours = {
    lundi: { open: '09:00', close: '18:00', isOpen: true },
    mardi: { open: '09:00', close: '18:00', isOpen: true },
    mercredi: { open: '09:00', close: '18:00', isOpen: true },
    jeudi: { open: '09:00', close: '18:00', isOpen: true },
    vendredi: { open: '09:00', close: '18:00', isOpen: true },
    samedi: { open: '10:00', close: '16:00', isOpen: false },
    dimanche: { open: '10:00', close: '16:00', isOpen: false },
  };

  const [businessHours, setBusinessHours] = useState<BusinessHours>(
    (user as { businessHours?: BusinessHours })?.businessHours || defaultBusinessHours
  );

  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/auth');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }

      // Convertir l'image en base64 pour la stocker dans localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setFormData({
          ...formData,
          photo: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBusinessHourChange = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    // Sauvegarder dans localStorage
    const updatedUser = { 
      ...user, 
      ...formData,
      ...(user.role === 'prestataire' && { businessHours }),
    };
    localStorage.setItem('miadoo_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload(); // Recharger pour appliquer les changements
  };

  const handleCancel = () => {
    const userData = user as { name: string; email: string; photo?: string; description?: string };
    setFormData({
      name: userData.name,
      email: userData.email,
      photo: userData.photo || '',
      description: userData.description || '',
    });
    setPhotoPreview(userData.photo || '');
    setIsEditing(false);
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
            Mon Profil
          </Typography>

          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={photoPreview}
                    alt={formData.name}
                    sx={{ width: 100, height: 100 }}
                  />
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                      component="label"
                    >
                      <PhotoCamera fontSize="small" />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </IconButton>
                  )}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {formData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.role === 'client' ? 'Client' : user.role === 'prestataire' ? 'Prestataire' : 'Administrateur'}
                  </Typography>
                  {isEditing && (
                    <Typography variant="caption" color="primary" sx={{ mt: 0.5, display: 'block' }}>
                      Cliquez sur l&apos;icône 📷 pour changer la photo
                    </Typography>
                  )}
                </Box>
              </Box>
              {!isEditing && (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              {user.role === 'prestataire' && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    multiline
                    rows={4}
                    helperText="Décrivez vos services et votre expérience"
                  />
                </Grid>
              )}

              {user.role === 'prestataire' && (
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Schedule color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Heures de Service
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    {jours.map((jour) => (
                      <Paper key={jour} sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Typography sx={{ minWidth: 100, fontWeight: 600, textTransform: 'capitalize' }}>
                            {jour}
                          </Typography>
                          
                          {businessHours[jour].isOpen ? (
                            <>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Ouverture</InputLabel>
                                <Select
                                  value={businessHours[jour].open}
                                  label="Ouverture"
                                  onChange={(e) => handleBusinessHourChange(jour, 'open', e.target.value)}
                                  disabled={!isEditing}
                                >
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i.toString().padStart(2, '0');
                                    return [
                                      <MenuItem key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</MenuItem>,
                                      <MenuItem key={`${hour}:30`} value={`${hour}:30`}>{`${hour}:30`}</MenuItem>,
                                    ];
                                  })}
                                </Select>
                              </FormControl>

                              <Typography>-</Typography>

                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Fermeture</InputLabel>
                                <Select
                                  value={businessHours[jour].close}
                                  label="Fermeture"
                                  onChange={(e) => handleBusinessHourChange(jour, 'close', e.target.value)}
                                  disabled={!isEditing}
                                >
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i.toString().padStart(2, '0');
                                    return [
                                      <MenuItem key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</MenuItem>,
                                      <MenuItem key={`${hour}:30`} value={`${hour}:30`}>{`${hour}:30`}</MenuItem>,
                                    ];
                                  })}
                                </Select>
                              </FormControl>

                              {isEditing && (
                                <Chip
                                  label="Fermé"
                                  onClick={() => handleBusinessHourChange(jour, 'isOpen', false)}
                                  color="default"
                                  variant="outlined"
                                />
                              )}
                            </>
                          ) : (
                            <>
                              <Chip label="Fermé" color="default" />
                              {isEditing && (
                                <Chip
                                  label="Ouvert"
                                  onClick={() => handleBusinessHourChange(jour, 'isOpen', true)}
                                  color="primary"
                                  variant="outlined"
                                />
                              )}
                            </>
                          )}
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Grid>
              )}

              {isEditing && (
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                    >
                      Enregistrer
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </motion.div>
      </Container>
      <Footer />
    </Box>
  );
}
