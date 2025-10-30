'use client';

import {
  Box,
  Typography,
  Avatar,
  Rating,
  Paper,
} from '@mui/material';
import { Review } from '@/types';
import { motion } from 'framer-motion';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Aucun avis pour le moment. Soyez le premier à donner votre avis !
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Paper sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar src={review.clientPhoto} alt={review.clientName} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {review.clientName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="body2" color="text.primary">
              {review.comment}
            </Typography>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
}
