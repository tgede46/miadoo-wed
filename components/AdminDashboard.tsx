'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Avatar,
  Chip,
  Box,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import {
  People,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Search,
  Block,
  CheckCircle,
  PersonAdd,
  Delete,
} from '@mui/icons-material';
import { mockUsers, mockPrestataires, mockOrders } from '@/data/mockData';
import { motion } from 'framer-motion';
import AdminStats from './AdminStats';
import ExportData from './ExportData';
import CategoryManager from './CategoryManager';
import AdminNotifications from './AdminNotifications';
import PerformanceMetrics from './PerformanceMetrics';

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleActive = (userId: string) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const roleColors: Record<string, 'primary' | 'secondary' | 'default'> = {
    client: 'primary',
    prestataire: 'secondary',
    admin: 'default',
  };

  // Calculs des statistiques
  const totalRevenue = mockOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = mockOrders.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const totalPrestataires = mockPrestataires.length;
  const completedOrders = mockOrders.filter((o) => o.status === 'completed').length;

  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = tabValue === 0 ? true :
                       tabValue === 1 ? user.role === 'client' :
                       tabValue === 2 ? user.role === 'prestataire' :
                       !user.isActive;
    return matchesSearch && matchesTab;
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🎯 Tableau de bord administrateur
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Vue d&apos;ensemble de la plateforme Miadoo
        </Typography>
      </motion.div>

      {/* Cartes de statistiques */}
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, mb: 4 }}>
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Utilisateurs actifs
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {activeUsers}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      sur {users.length} total
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 50, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Prestataires
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {totalPrestataires}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      services actifs
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 50, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Réservations
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {totalOrders}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {completedOrders} complétées
                    </Typography>
                  </Box>
                  <ShoppingCart sx={{ fontSize: 50, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card sx={{ 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Revenus totaux
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {totalRevenue}€
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      ce mois
                    </Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 50, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>

      {/* Graphique de progression */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📊 Activité de la plateforme
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Taux de complétion des réservations</Typography>
              <Typography variant="body2" fontWeight="bold">
                {totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Taux d&apos;activation des utilisateurs</Typography>
              <Typography variant="body2" fontWeight="bold">
                {users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={users.length > 0 ? (activeUsers / users.length) * 100 : 0} 
              sx={{ height: 10, borderRadius: 5 }}
              color="secondary"
            />
          </Box>
        </Box>
      </Paper>

      {/* Graphiques statistiques */}
      <Box sx={{ mt: 4 }}>
        <AdminStats />
      </Box>

      {/* Notifications Admin */}
      <Box sx={{ mt: 4 }}>
        <AdminNotifications />
      </Box>

      {/* Indicateurs de performance */}
      <Box sx={{ mt: 4 }}>
        <PerformanceMetrics />
      </Box>

      {/* Gestion des catégories */}
      <Box sx={{ mt: 4 }}>
        <CategoryManager />
      </Box>

      {/* Gestion des utilisateurs */}
      <Paper sx={{ mt: 4 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                👥 Gestion des utilisateurs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredUsers.length} utilisateur(s) affiché(s)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <ExportData 
                data={filteredUsers.map(u => ({
                  id: u.id,
                  name: u.name,
                  email: u.email,
                  role: u.role,
                  isActive: u.isActive,
                  createdAt: new Date(u.createdAt).toLocaleDateString('fr-FR'),
                }))}
                filename="utilisateurs_miadoo"
              />
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                size="small"
              >
                Ajouter
              </Button>
            </Box>
          </Box>

          {/* Barre de recherche et filtres */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Tabs de filtrage */}
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
        >
          <Tab label={`Tous (${users.length})`} />
          <Tab label={`Clients (${users.filter(u => u.role === 'client').length})`} />
          <Tab label={`Prestataires (${users.filter(u => u.role === 'prestataire').length})`} />
          <Tab label={`Inactifs (${users.filter(u => !u.isActive).length})`} />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Date d&apos;inscription</TableCell>
                <TableCell align="center">Statut</TableCell>
                <TableCell align="center">Actif</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" color="text.secondary">
                      Aucun utilisateur trouvé
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    hover
                    component={motion.tr}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={user.photo} alt={user.name} />
                        <Box>
                          <Typography fontWeight="medium">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id.slice(0, 8)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={roleColors[user.role]} 
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={user.isActive ? <CheckCircle /> : <Block />}
                        label={user.isActive ? 'Actif' : 'Inactif'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                        variant={user.isActive ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={user.isActive}
                        onChange={() => handleToggleActive(user.id)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Supprimer l'utilisateur"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Réservations récentes */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            📦 Réservations récentes
          </Typography>
          <ExportData 
            data={mockOrders.map(o => ({
              id: o.id,
              clientId: o.clientId,
              prestataireId: o.prestataireId,
              status: o.status,
              totalPrice: o.totalPrice,
              date: new Date(o.date).toLocaleDateString('fr-FR'),
            }))}
            filename="reservations_miadoo"
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Prestataire</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockOrders.slice(0, 5).map((order) => {
                const client = users.find((u) => u.id === order.clientId);
                const prestataire = mockPrestataires.find((p) => p.id === order.prestataireId);
                return (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="caption" fontFamily="monospace">
                        {order.id.slice(0, 10)}...
                      </Typography>
                    </TableCell>
                    <TableCell>{client?.name || 'Inconnu'}</TableCell>
                    <TableCell>{prestataire?.name || 'Inconnu'}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color="primary">
                        {order.totalPrice}€
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === 'completed' ? 'success' :
                          order.status === 'pending' ? 'warning' :
                          order.status === 'confirmed' ? 'info' : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
