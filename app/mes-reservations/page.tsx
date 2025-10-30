'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import { Event, AccessTime, Euro } from '@mui/icons-material';
import { mockOrders, mockPrestataires } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function MesReservationsPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Filtrer les réservations de l'utilisateur
  const userOrders = mockOrders.filter((order) => order.clientId === user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
            Mes Réservations
          </Typography>
        </motion.div>

        {userOrders.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Vous n&apos;avez pas encore de réservation
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Explorez notre catalogue de services pour faire votre première réservation !
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/services')}
              sx={{ mt: 2 }}
            >
              Voir les Services
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {userOrders.map((order, index) => {
              const prestataire = mockPrestataires.find(
                (p) => p.id === order.prestataireId
              );
              const service = prestataire?.services.find(
                (s) => s.id === order.serviceId
              );

              return (
                <Box key={order.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold">
                            {service?.name || 'Service'}
                          </Typography>
                          <Chip
                            label={getStatusLabel(order.status)}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </Box>

                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Prestataire: {prestataire?.name || 'N/A'}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                          <Event fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <AccessTime fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.date).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Euro fontSize="small" color="primary" />
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            {order.totalPrice}€
                          </Typography>
                        </Box>

                        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              router.push(`/prestataire/${prestataire?.id}`)
                            }
                          >
                            Voir le prestataire
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => router.push('/chat')}
                          >
                            Contacter
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}
