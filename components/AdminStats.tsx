'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Données pour le graphique des réservations (7 derniers jours)
const bookingsData = [
  { jour: 'Lun', reservations: 12, revenus: 450 },
  { jour: 'Mar', reservations: 19, revenus: 680 },
  { jour: 'Mer', reservations: 15, revenus: 520 },
  { jour: 'Jeu', reservations: 22, revenus: 780 },
  { jour: 'Ven', reservations: 28, revenus: 920 },
  { jour: 'Sam', reservations: 35, revenus: 1200 },
  { jour: 'Dim', reservations: 30, revenus: 1050 },
];

// Données pour le graphique des catégories
const categoriesData = [
  { name: 'Coiffure', value: 35, color: '#9c27b0' },
  { name: 'Beauté', value: 25, color: '#e91e63' },
  { name: 'Massage', value: 20, color: '#00bcd4' },
  { name: 'Cuisine', value: 15, color: '#ff9800' },
  { name: 'Autre', value: 5, color: '#607d8b' },
];

// Données pour l'évolution des utilisateurs
const usersGrowthData = [
  { mois: 'Jan', clients: 45, prestataires: 12 },
  { mois: 'Fév', clients: 52, prestataires: 15 },
  { mois: 'Mar', clients: 61, prestataires: 18 },
  { mois: 'Avr', clients: 70, prestataires: 22 },
  { mois: 'Mai', clients: 85, prestataires: 28 },
  { mois: 'Juin', clients: 95, prestataires: 32 },
];

export default function AdminStats() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Graphique des réservations */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📈 Évolution des réservations (7 derniers jours)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="reservations"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Réservations"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenus"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Revenus (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Graphique des catégories */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🎯 Répartition par catégorie
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: { name?: string; value?: number }) => `${entry.name || ''}: ${entry.value || 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Graphique croissance utilisateurs */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              👥 Croissance des utilisateurs (6 derniers mois)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" fill="#667eea" name="Clients" />
                <Bar dataKey="prestataires" fill="#f093fb" name="Prestataires" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
