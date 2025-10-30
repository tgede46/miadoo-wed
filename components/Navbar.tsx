'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ClientNavbar from './ClientNavbar';
import PrestataireNavbar from './PrestataireNavbar';
import AdminNavbar from './AdminNavbar';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Home,
  Store,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Afficher la navbar spécifique au rôle si authentifié
  if (mounted && isAuthenticated && user) {
    if (user.role === 'admin') {
      return <AdminNavbar />;
    }
    if (user.role === 'prestataire') {
      return <PrestataireNavbar />;
    }
    if (user.role === 'client') {
      return <ClientNavbar />;
    }
  }

  // Navbar par défaut pour les non-authentifiés
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textDecoration: 'none',
            cursor: 'pointer',
            mr: 4,
          }}
        >
          🌍 Miadoo
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<Home />}
            sx={{ textTransform: 'none' }}
          >
            Accueil
          </Button>
          <Button
            component={Link}
            href="/services"
            startIcon={<Store />}
            sx={{ textTransform: 'none' }}
          >
            Services
          </Button>
        </Box>

        <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {mounted ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              component={Link}
              href="/auth"
              sx={{ textTransform: 'none' }}
            >
              Se connecter
            </Button>
            <Button
              variant="contained"
              component={Link}
              href="/auth"
              sx={{ textTransform: 'none' }}
            >
              S&apos;inscrire
            </Button>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
