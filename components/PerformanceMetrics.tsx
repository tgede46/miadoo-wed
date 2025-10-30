'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Remove,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface PerformanceMetric {
  title: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export default function PerformanceMetrics() {
  const metrics: PerformanceMetric[] = [
    {
      title: 'Taux de conversion',
      value: 68,
      target: 75,
      unit: '%',
      trend: 'up',
      trendValue: 5.2,
    },
    {
      title: 'Satisfaction clients',
      value: 4.8,
      target: 5.0,
      unit: '/5',
      trend: 'up',
      trendValue: 0.3,
    },
    {
      title: 'Temps de réponse moyen',
      value: 15,
      target: 10,
      unit: 'min',
      trend: 'down',
      trendValue: 2.5,
    },
    {
      title: 'Taux de rétention',
      value: 82,
      target: 80,
      unit: '%',
      trend: 'stable',
      trendValue: 0,
    },
    {
      title: 'Croissance mensuelle',
      value: 12,
      target: 15,
      unit: '%',
      trend: 'up',
      trendValue: 3.5,
    },
    {
      title: 'Taux d\'annulation',
      value: 5,
      target: 8,
      unit: '%',
      trend: 'down',
      trendValue: 1.2,
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp fontSize="small" />;
      case 'down': return <TrendingDown fontSize="small" />;
      default: return <Remove fontSize="small" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        📊 Indicateurs de performance (KPI)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Mesures clés pour suivre la santé de la plateforme
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={metric.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderLeft: 4,
                  borderColor: metric.value >= metric.target ? 'success.main' : 'warning.main',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    {metric.title}
                  </Typography>
                  <Chip
                    icon={getTrendIcon(metric.trend)}
                    label={`${metric.trendValue > 0 ? '+' : ''}${metric.trendValue}${metric.unit}`}
                    size="small"
                    color={getTrendColor(metric.trend) as 'success' | 'error' | 'default'}
                    sx={{ height: 24 }}
                  />
                </Box>

                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {metric.value}{metric.unit}
                </Typography>

                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Objectif: {metric.target}{metric.unit}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      {Math.round((metric.value / metric.target) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((metric.value / metric.target) * 100, 100)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: metric.value >= metric.target ? 'success.main' : 'warning.main',
                      },
                    }}
                  />
                </Box>

                {metric.value >= metric.target && (
                  <Chip
                    label="✓ Objectif atteint"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
