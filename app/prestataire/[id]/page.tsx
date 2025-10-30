'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import Navbar from '@/components/Navbar';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Rating,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { AccessTime, Euro, ArrowBack } from '@mui/icons-material';
import { mockPrestataires, mockOrders } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function PrestatairePage() {
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const params = useParams();
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const prestataire = mockPrestataires.find((p) => p.id === params.id);

  if (!prestataire) {
    return null;
  }

  const handleBooking = (serviceId: string) => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    setSelectedService(serviceId);
    setOpenBooking(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !user) return;

    const service = prestataire.services.find((s) => s.id === selectedService);
    if (!service) return;

    // Simuler la création d'une réservation
    const newOrder = {
      id: `order-${crypto.randomUUID()}`,
      serviceId: selectedService,
      clientId: user.id,
      prestataireId: prestataire.id,
      status: 'pending' as const,
      date: new Date(bookingDate),
      totalPrice: service.price,
      createdAt: new Date(),
    };

    mockOrders.push(newOrder);
    
    // Ajouter une notification
    addNotification({
      type: 'booking',
      title: 'Réservation confirmée',
      message: `Votre réservation pour ${service.name} a été confirmée`,
      read: false,
    });

    setBookingSuccess(true);
    setOpenBooking(false);

    setTimeout(() => {
      setBookingSuccess(false);
    }, 3000);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    if (!user) return;

    const newReview = {
      id: `review-${crypto.randomUUID()}`,
      prestataireId: prestataire.id,
      clientId: user.id,
      clientName: user.name,
      clientPhoto: user.photo || '',
      rating,
      comment,
      createdAt: new Date(),
    };

    prestataire.reviews.push(newReview);
    
    // Ajouter une notification
    addNotification({
      type: 'review',
      title: 'Avis publié',
      message: `Votre avis pour ${prestataire.name} a été publié`,
      read: false,
    });

    setShowReviewForm(false);
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
          variant="outlined"
        >
          Retour
        </Button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={prestataire.photo}
                    alt={prestataire.name}
                    sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    {prestataire.name} {prestataire.culturalBadge}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating value={prestataire.rating || 0} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({prestataire.reviewCount} avis)
                    </Typography>
                  </Box>
                  <Chip label={prestataire.category} color="primary" sx={{ mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {prestataire.email}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push('/chat')}
                  >
                    Contacter
                  </Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  À propos
                </Typography>
                <Typography variant="body1" paragraph>
                  {prestataire.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                  {prestataire.media.map((media) => (
                    <Box
                      key={media.id}
                      component="img"
                      src={media.url}
                      alt="Portfolio"
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
                  Services proposés
                </Typography>

                <Grid container spacing={2}>
                  {prestataire.services.map((service) => (
                    <Grid size={{ xs: 12 }} key={service.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {service.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {service.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Euro fontSize="small" color="primary" />
                              <Typography variant="h6" color="primary">
                                {service.price}€
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTime fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                {service.duration} min
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            variant="contained"
                            onClick={() => handleBooking(service.id)}
                          >
                            Réserver
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Section des avis */}
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Avis clients ({prestataire.reviews.length})
                </Typography>

                {isAuthenticated && user && (
                  <Box sx={{ mb: 3 }}>
                    {!showReviewForm ? (
                      <Button
                        variant="outlined"
                        onClick={() => setShowReviewForm(true)}
                      >
                        Laisser un avis
                      </Button>
                    ) : (
                      <ReviewForm
                        onSubmit={handleSubmitReview}
                        onCancel={() => setShowReviewForm(false)}
                      />
                    )}
                  </Box>
                )}

                <ReviewList reviews={prestataire.reviews} />
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Dialog de réservation */}
        <Dialog open={openBooking} onClose={() => setOpenBooking(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Confirmer la réservation</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choisissez une date pour votre réservation
            </Typography>
            <TextField
              fullWidth
              type="datetime-local"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBooking(false)}>Annuler</Button>
            <Button
              onClick={handleConfirmBooking}
              variant="contained"
              disabled={!bookingDate}
            >
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Message de succès */}
        <Dialog open={bookingSuccess} onClose={() => setBookingSuccess(false)}>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h5" gutterBottom color="success.main">
                ✓ Réservation confirmée !
              </Typography>
              <Typography variant="body1">
                Votre demande a été envoyée au prestataire.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
