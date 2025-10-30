'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  PersonAdd,
  ShoppingCart,
  Star,
  Block,
  CheckCircle,
  Edit,
  FilterList,
  AccessTime,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Activity {
  id: string;
  type: 'user' | 'booking' | 'review' | 'admin';
  action: string;
  user: string;
  userPhoto: string;
  details: string;
  time: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export default function ActivityTimeline() {
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'user' | 'booking' | 'review' | 'admin'>('all');

  const activities: Activity[] = [
    {
      id: '1',
      type: 'user',
      action: 'Nouvelle inscription',
      user: 'Sophie Martin',
      userPhoto: 'https://i.pravatar.cc/150?img=25',
      details: 'Client - sophie.martin@example.com',
      time: 'Il y a 5 min',
      icon: <PersonAdd />,
      color: 'success',
    },
    {
      id: '2',
      type: 'booking',
      action: 'Réservation confirmée',
      user: 'Jean Dupont',
      userPhoto: 'https://i.pravatar.cc/150?img=13',
      details: 'Service: Coiffure - 45€',
      time: 'Il y a 15 min',
      icon: <ShoppingCart />,
      color: 'primary',
    },
    {
      id: '3',
      type: 'review',
      action: 'Nouvel avis publié',
      user: 'Marie Blanc',
      userPhoto: 'https://i.pravatar.cc/150?img=5',
      details: '⭐⭐⭐⭐⭐ "Excellent service!"',
      time: 'Il y a 30 min',
      icon: <Star />,
      color: 'warning',
    },
    {
      id: '4',
      type: 'admin',
      action: 'Compte désactivé',
      user: 'Admin',
      userPhoto: 'https://i.pravatar.cc/150?img=1',
      details: 'Utilisateur: spam.user@example.com',
      time: 'Il y a 1h',
      icon: <Block />,
      color: 'error',
    },
    {
      id: '5',
      type: 'user',
      action: 'Profil vérifié',
      user: 'Luc Bernard',
      userPhoto: 'https://i.pravatar.cc/150?img=14',
      details: 'Prestataire - Documents validés',
      time: 'Il y a 2h',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      id: '6',
      type: 'booking',
      action: 'Réservation annulée',
      user: 'Claire Dubois',
      userPhoto: 'https://i.pravatar.cc/150?img=9',
      details: 'Service: Massage - Remboursement effectué',
      time: 'Il y a 3h',
      icon: <ShoppingCart />,
      color: 'error',
    },
    {
      id: '7',
      type: 'admin',
      action: 'Catégorie modifiée',
      user: 'Admin',
      userPhoto: 'https://i.pravatar.cc/150?img=1',
      details: 'Catégorie: Beauté - Couleur mise à jour',
      time: 'Il y a 4h',
      icon: <Edit />,
      color: 'info',
    },
    {
      id: '8',
      type: 'review',
      action: 'Avis signalé',
      user: 'Pierre Martin',
      userPhoto: 'https://i.pravatar.cc/150?img=12',
      details: 'Avis sur: Salon Élégance',
      time: 'Il y a 5h',
      icon: <Star />,
      color: 'error',
    },
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterSelect = (newFilter: typeof filter) => {
    setFilter(newFilter);
    handleFilterClose();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccessTime sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              ⏱️ Timeline d&apos;activités
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Historique des actions en temps réel
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            label={`${filteredActivities.length} activité(s)`}
            color="primary"
            size="small"
          />
          <IconButton onClick={handleFilterClick} size="small">
            <FilterList />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleFilterSelect('all')}>
          <ListItemText>Toutes les activités</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('user')}>
          <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon>
          <ListItemText>Utilisateurs</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('booking')}>
          <ListItemIcon><ShoppingCart fontSize="small" /></ListItemIcon>
          <ListItemText>Réservations</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('review')}>
          <ListItemIcon><Star fontSize="small" /></ListItemIcon>
          <ListItemText>Avis</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('admin')}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Actions admin</ListItemText>
        </MenuItem>
      </Menu>

      <Timeline position="alternate">
        {filteredActivities.map((activity, index) => (
          <TimelineItem key={activity.id}>
            <TimelineOppositeContent color="text.secondary">
              <Typography variant="caption">{activity.time}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <TimelineDot color={activity.color}>
                  {activity.icon}
                </TimelineDot>
              </motion.div>
              {index < filteredActivities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar src={activity.userPhoto} alt={activity.user} sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.user}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {activity.details}
                  </Typography>
                  <Chip
                    label={activity.type}
                    size="small"
                    color={activity.color}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
