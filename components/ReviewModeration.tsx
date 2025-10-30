'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import {
  RateReview,
  Visibility,
  Delete,
  CheckCircle,
  Block,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  prestataireId: string;
  prestataireName: string;
  prestatairePhoto: string;
  clientId: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  comment: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reports: number;
}

export default function ReviewModeration() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [moderationNote, setModerationNote] = useState('');

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      prestataireId: 'prest-1',
      prestataireName: 'Salon Élégance',
      prestatairePhoto: 'https://i.pravatar.cc/150?img=31',
      clientId: 'client-1',
      clientName: 'Marie Dubois',
      clientPhoto: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'Service excellent ! Très professionnelle et à l\'écoute. Je recommande vivement !',
      createdAt: new Date('2025-10-29'),
      status: 'pending',
      reports: 0,
    },
    {
      id: '2',
      prestataireId: 'prest-2',
      prestataireName: 'Chef à domicile Pro',
      prestatairePhoto: 'https://i.pravatar.cc/150?img=32',
      clientId: 'client-2',
      clientName: 'Jean Martin',
      clientPhoto: 'https://i.pravatar.cc/150?img=12',
      rating: 1,
      comment: 'TERRIBLE!!! ARNAQUE TOTALE!!! NE JAMAIS RÉSERVER!!!',
      createdAt: new Date('2025-10-28'),
      status: 'pending',
      reports: 3,
    },
    {
      id: '3',
      prestataireId: 'prest-3',
      prestataireName: 'Massage Zen',
      prestatairePhoto: 'https://i.pravatar.cc/150?img=33',
      clientId: 'client-3',
      clientName: 'Sophie Laurent',
      clientPhoto: 'https://i.pravatar.cc/150?img=9',
      rating: 4,
      comment: 'Très bon massage, ambiance relaxante. Juste un peu cher à mon goût.',
      createdAt: new Date('2025-10-27'),
      status: 'approved',
      reports: 0,
    },
    {
      id: '4',
      prestataireId: 'prest-4',
      prestataireName: 'Atelier Créatif',
      prestatairePhoto: 'https://i.pravatar.cc/150?img=34',
      clientId: 'client-4',
      clientName: 'Pierre Durand',
      clientPhoto: 'https://i.pravatar.cc/150?img=15',
      rating: 2,
      comment: 'Service moyen. Pas très satisfait du résultat final.',
      createdAt: new Date('2025-10-26'),
      status: 'approved',
      reports: 0,
    },
    {
      id: '5',
      prestataireId: 'prest-1',
      prestataireName: 'Salon Élégance',
      prestatairePhoto: 'https://i.pravatar.cc/150?img=31',
      clientId: 'client-5',
      clientName: 'Spam Account',
      clientPhoto: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      comment: 'Visitez mon site web pour des offres incroyables! www.spam.com',
      createdAt: new Date('2025-10-25'),
      status: 'rejected',
      reports: 5,
    },
  ]);

  const filteredReviews = reviews.filter(review => {
    if (tabValue === 0) return review.status === 'pending';
    if (tabValue === 1) return review.status === 'approved';
    if (tabValue === 2) return review.status === 'rejected';
    if (tabValue === 3) return review.reports > 0;
    return true;
  });

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status: 'approved' as const } : r
    ));
    setSelectedReview(null);
  };

  const handleReject = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status: 'rejected' as const } : r
    ));
    setSelectedReview(null);
  };

  const handleDelete = (reviewId: string) => {
    if (confirm('Supprimer définitivement cet avis ?')) {
      setReviews(reviews.filter(r => r.id !== reviewId));
      setSelectedReview(null);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RateReview sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              ⭐ Modération des avis
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Validation et gestion des avis clients
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`${reviews.filter(r => r.status === 'pending').length} en attente`}
            color="warning"
            size="small"
          />
          <Chip
            label={`${reviews.filter(r => r.reports > 0).length} signalés`}
            color="error"
            size="small"
          />
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label={`En attente (${reviews.filter(r => r.status === 'pending').length})`} />
        <Tab label={`Approuvés (${reviews.filter(r => r.status === 'approved').length})`} />
        <Tab label={`Rejetés (${reviews.filter(r => r.status === 'rejected').length})`} />
        <Tab label={`Signalés (${reviews.filter(r => r.reports > 0).length})`} />
      </Tabs>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell>Client</TableCell>
              <TableCell>Prestataire</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Commentaire</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReviews.map((review, index) => (
              <TableRow
                key={review.id}
                component={motion.tr}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                hover
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={review.clientPhoto} alt={review.clientName} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2">{review.clientName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={review.prestatairePhoto} alt={review.prestataireName} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2">{review.prestataireName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Rating value={review.rating} readOnly size="small" />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Typography variant="body2" noWrap>
                    {review.comment}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {review.createdAt.toLocaleDateString('fr-FR')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                    <Chip
                      label={
                        review.status === 'pending' ? 'En attente' :
                        review.status === 'approved' ? 'Approuvé' : 'Rejeté'
                      }
                      color={
                        review.status === 'pending' ? 'warning' :
                        review.status === 'approved' ? 'success' : 'error'
                      }
                      size="small"
                    />
                    {review.reports > 0 && (
                      <Chip
                        label={`${review.reports} signalement(s)`}
                        color="error"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => setSelectedReview(review)}
                    title="Voir les détails"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  {review.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleApprove(review.id)}
                        title="Approuver"
                      >
                        <CheckCircle fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleReject(review.id)}
                        title="Rejeter"
                      >
                        <Block fontSize="small" />
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(review.id)}
                    title="Supprimer"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de détails */}
      <Dialog
        open={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedReview && (
          <>
            <DialogTitle>Détails de l&apos;avis</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar src={selectedReview.clientPhoto} alt={selectedReview.clientName} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedReview.clientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avis pour {selectedReview.prestataireName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Note
                  </Typography>
                  <Rating value={selectedReview.rating} readOnly />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Commentaire
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Typography variant="body1">
                      {selectedReview.comment}
                    </Typography>
                  </Paper>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date de publication
                  </Typography>
                  <Typography variant="body1">
                    {selectedReview.createdAt.toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>

                {selectedReview.reports > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`${selectedReview.reports} signalement(s)`}
                      color="error"
                      icon={<Block />}
                    />
                  </Box>
                )}

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Note de modération (optionnelle)"
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  placeholder="Raison de l'approbation ou du rejet..."
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedReview(null)}>Fermer</Button>
              <Button
                color="error"
                onClick={() => handleDelete(selectedReview.id)}
                startIcon={<Delete />}
              >
                Supprimer
              </Button>
              {selectedReview.status === 'pending' && (
                <>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleReject(selectedReview.id)}
                    startIcon={<Block />}
                  >
                    Rejeter
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleApprove(selectedReview.id)}
                    startIcon={<CheckCircle />}
                  >
                    Approuver
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
}
