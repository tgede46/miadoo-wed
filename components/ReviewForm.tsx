'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  Paper,
} from '@mui/material';
import { Send } from '@mui/icons-material';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  onCancel?: () => void;
}

export default function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
      setRating(5);
      setComment('');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Laisser un avis
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Votre note
          </Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue || 0)}
            size="large"
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Votre commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Send />}
            disabled={rating === 0 || !comment.trim()}
          >
            Publier l&apos;avis
          </Button>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Annuler
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
}
