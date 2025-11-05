'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  IconButton,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import {
  Search,
  Block,
  CheckCircle,
  Delete,
  PersonAdd,
  Download,
  PictureAsPdf,
  TableChart,
  Description,
} from '@mui/icons-material';
import { mockUsers } from '@/data/mockData';
import { motion } from 'framer-motion';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function UtilisateursPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const exportMenuOpen = Boolean(exportAnchorEl);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    } else if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const handleToggleActive = (userId: string) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Nom', 'Email', 'Rôle', 'Date d\'inscription', 'Statut', 'Actif'];
    const rows = filteredUsers.map(u => [
      u.id,
      u.name,
      u.email,
      u.role,
      new Date(u.createdAt).toLocaleDateString('fr-FR'),
      u.isActive ? 'Actif' : 'Inactif',
      u.isActive ? 'Oui' : 'Non'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_miadoo_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    handleExportClose();
  };

  const exportToExcel = () => {
    const headers = ['ID', 'Nom', 'Email', 'Rôle', 'Date d\'inscription', 'Statut', 'Actif'];
    const rows = filteredUsers.map(u => [
      u.id,
      u.name,
      u.email,
      u.role,
      new Date(u.createdAt).toLocaleDateString('fr-FR'),
      u.isActive ? 'Actif' : 'Inactif',
      u.isActive ? 'Oui' : 'Non'
    ]);

    // Création d'un fichier Excel simple (format TSV)
    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_miadoo_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    handleExportClose();
  };

  const exportToPDF = () => {
    // Création d'un contenu HTML pour le PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Liste des utilisateurs Miadoo</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #1976d2; border-bottom: 3px solid #1976d2; padding-bottom: 10px; }
          .info { margin: 20px 0; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #1976d2; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          tr:hover { background-color: #f5f5f5; }
          .badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
          .badge-active { background-color: #4caf50; color: white; }
          .badge-inactive { background-color: #f44336; color: white; }
          .badge-client { background-color: #2196f3; color: white; }
          .badge-prestataire { background-color: #9c27b0; color: white; }
          .badge-admin { background-color: #ff9800; color: white; }
        </style>
      </head>
      <body>
        <h1>📋 Liste des utilisateurs - Miadoo</h1>
        <div class="info">
          <p><strong>Date d'export :</strong> ${new Date().toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p><strong>Nombre d'utilisateurs :</strong> ${filteredUsers.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date d'inscription</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            ${filteredUsers.map(u => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td>${u.email}</td>
                <td><span class="badge badge-${u.role}">${u.role}</span></td>
                <td>${new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                <td><span class="badge ${u.isActive ? 'badge-active' : 'badge-inactive'}">${u.isActive ? 'Actif' : 'Inactif'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_miadoo_${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    handleExportClose();
  };

  const roleColors: Record<string, 'primary' | 'secondary' | 'default'> = {
    client: 'primary',
    prestataire: 'secondary',
    admin: 'default',
  };

  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      tabValue === 0
        ? true
        : tabValue === 1
        ? user.role === 'client'
        : tabValue === 2
        ? user.role === 'prestataire'
        : !user.isActive;
    return matchesSearch && matchesTab;
  });

  return (
    <Box>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            👥 Gestion des utilisateurs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Gérez tous les utilisateurs de la plateforme Miadoo
          </Typography>
        </motion.div>

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
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  size="small"
                  onClick={handleExportClick}
                >
                  Exporter
                </Button>
                <Menu
                  anchorEl={exportAnchorEl}
                  open={exportMenuOpen}
                  onClose={handleExportClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={exportToCSV}>
                    <ListItemIcon>
                      <Description fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Exporter en CSV</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={exportToExcel}>
                    <ListItemIcon>
                      <TableChart fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Exporter en Excel</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={exportToPDF}>
                    <ListItemIcon>
                      <PictureAsPdf fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Exporter en PDF (HTML)</ListItemText>
                  </MenuItem>
                </Menu>
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
      </Container>
      <Footer />
    </Box>
  );
}
