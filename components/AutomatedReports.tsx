'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Assessment,
  Download,
  CalendarMonth,
  TrendingUp,
  Visibility,
  Print,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  status: 'generated' | 'pending';
  metrics: {
    users: number;
    revenue: number;
    bookings: number;
    satisfaction: number;
  };
}

export default function AutomatedReports() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Rapport Mensuel - Octobre 2025',
      type: 'monthly',
      date: '2025-10-30',
      status: 'generated',
      metrics: {
        users: 127,
        revenue: 15750,
        bookings: 245,
        satisfaction: 4.8,
      },
    },
    {
      id: '2',
      title: 'Rapport Hebdomadaire - Semaine 43',
      type: 'weekly',
      date: '2025-10-27',
      status: 'generated',
      metrics: {
        users: 32,
        revenue: 3840,
        bookings: 58,
        satisfaction: 4.7,
      },
    },
    {
      id: '3',
      title: 'Rapport Quotidien - 30 Oct 2025',
      type: 'daily',
      date: '2025-10-30',
      status: 'generated',
      metrics: {
        users: 5,
        revenue: 560,
        bookings: 12,
        satisfaction: 4.9,
      },
    },
    {
      id: '4',
      title: 'Rapport Mensuel - Novembre 2025',
      type: 'monthly',
      date: '2025-11-01',
      status: 'pending',
      metrics: {
        users: 0,
        revenue: 0,
        bookings: 0,
        satisfaction: 0,
      },
    },
  ]);

  const handleGenerateReport = () => {
    alert(`Génération d'un rapport ${reportType} en cours...`);
    setOpenDialog(false);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = (report: Report) => {
    const reportData = {
      title: report.title,
      date: new Date(report.date).toLocaleDateString('fr-FR'),
      metrics: report.metrics,
      summary: `Ce rapport ${report.type} présente les performances de la plateforme Miadoo.`,
    };
    
    const json = JSON.stringify(reportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rapport_${report.id}.json`;
    link.click();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'info';
      case 'weekly': return 'success';
      case 'monthly': return 'primary';
      default: return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily': return 'Quotidien';
      case 'weekly': return 'Hebdomadaire';
      case 'monthly': return 'Mensuel';
      default: return type;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Assessment sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              📋 Rapports Automatisés
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Génération et consultation des rapports d&apos;activité
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<CalendarMonth />}
          onClick={() => setOpenDialog(true)}
        >
          Générer un rapport
        </Button>
      </Box>

      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Nouveaux utilisateurs', value: reports[0]?.metrics.users || 0, icon: '👥' },
          { label: 'Revenus totaux', value: `${reports[0]?.metrics.revenue || 0}€`, icon: '💰' },
          { label: 'Réservations', value: reports[0]?.metrics.bookings || 0, icon: '📦' },
          { label: 'Satisfaction', value: `${reports[0]?.metrics.satisfaction || 0}/5`, icon: '⭐' },
        ].map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4">{stat.icon}</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Liste des rapports */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell>Titre</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.id}
                component={motion.tr}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                hover
              >
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="medium">
                    {report.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getTypeLabel(report.type)}
                    size="small"
                    color={getTypeColor(report.type) as 'info' | 'success' | 'primary'}
                  />
                </TableCell>
                <TableCell>
                  {new Date(report.date).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={report.status === 'generated' ? 'Généré' : 'En attente'}
                    size="small"
                    color={report.status === 'generated' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleViewReport(report)}
                    disabled={report.status !== 'generated'}
                    title="Voir le rapport"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleDownloadReport(report)}
                    disabled={report.status !== 'generated'}
                    title="Télécharger"
                  >
                    <Download fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => window.print()}
                    disabled={report.status !== 'generated'}
                    title="Imprimer"
                  >
                    <Print fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour générer un rapport */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Générer un nouveau rapport</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              select
              fullWidth
              label="Type de rapport"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'daily' | 'weekly' | 'monthly')}
            >
              <MenuItem value="daily">Quotidien</MenuItem>
              <MenuItem value="weekly">Hebdomadaire</MenuItem>
              <MenuItem value="monthly">Mensuel</MenuItem>
            </TextField>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Le rapport sera généré avec les données actuelles de la plateforme.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleGenerateReport} startIcon={<TrendingUp />}>
            Générer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour voir le rapport */}
      <Dialog
        open={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedReport?.title}</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                📊 Métriques Clés
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                    <Typography variant="h4" color="primary.contrastText">
                      {selectedReport.metrics.users}
                    </Typography>
                    <Typography variant="caption">Nouveaux utilisateurs</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                    <Typography variant="h4" color="success.contrastText">
                      {selectedReport.metrics.revenue}€
                    </Typography>
                    <Typography variant="caption">Revenus</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
                    <Typography variant="h4" color="info.contrastText">
                      {selectedReport.metrics.bookings}
                    </Typography>
                    <Typography variant="caption">Réservations</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                    <Typography variant="h4" color="warning.contrastText">
                      {selectedReport.metrics.satisfaction}/5
                    </Typography>
                    <Typography variant="caption">Satisfaction</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Typography variant="caption" color="text.secondary">
                Date de génération : {new Date(selectedReport.date).toLocaleDateString('fr-FR')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedReport(null)}>Fermer</Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => selectedReport && handleDownloadReport(selectedReport)}
          >
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
