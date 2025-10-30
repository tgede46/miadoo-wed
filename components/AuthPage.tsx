'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Tab,
  Tabs,
  MenuItem,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ServiceCategory } from '@/types';

const categories: { value: ServiceCategory; label: string }[] = [
  { value: 'coiffure', label: 'Coiffure' },
  { value: 'beauté', label: 'Beauté' },
  { value: 'massage', label: 'Massage' },
  { value: 'cuisine', label: 'Cuisine' },
  { value: 'artisanat', label: 'Artisanat' },
  { value: 'musique', label: 'Musique' },
  { value: 'autre', label: 'Autre' },
];

export default function AuthPage() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'client' | 'prestataire'>('client');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('coiffure');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    setLoading(false);

    if (success) {
      router.push('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await register({
      email,
      password,
      name,
      role,
      description: role === 'prestataire' ? description : undefined,
      category: role === 'prestataire' ? category : undefined,
      price: role === 'prestataire' ? parseFloat(price) : undefined,
    });

    setLoading(false);

    if (success) {
      router.push('/');
    } else {
      setError('Cet email est déjà utilisé');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #ff8c42 0%, #ffad70 100%)'
            : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
              🌍 Miadoo
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3 }} color="text.secondary">
              Plateforme de services culturels
            </Typography>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }} centered>
              <Tab label="Connexion" />
              <Tab label="Inscription" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {tab === 0 ? (
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
                
                <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    <strong>Comptes de test :</strong>
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Client : marie@example.com
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Prestataire : amina@example.com
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Admin : admin@miadoo.com
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Mot de passe : n&apos;importe lequel
                  </Typography>
                </Box>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  select
                  fullWidth
                  label="Type de compte"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'client' | 'prestataire')}
                  margin="normal"
                  required
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="prestataire">Prestataire</MenuItem>
                </TextField>

                {role === 'prestataire' && (
                  <>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      select
                      fullWidth
                      label="Catégorie de service"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                      margin="normal"
                      required
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Prix de base (€)"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      margin="normal"
                      required
                    />
                  </>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? 'Inscription...' : 'S\'inscrire'}
                </Button>
              </form>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
