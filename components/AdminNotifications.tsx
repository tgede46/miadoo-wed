'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Badge,
  Collapse,
} from '@mui/material';
import {
  Notifications,
  Warning,
  Info,
  CheckCircle,
  Error,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function AdminNotifications() {
  const [expanded, setExpanded] = useState(true);
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Nouveau prestataire en attente',
      message: '3 prestataires attendent validation de leur profil',
      time: 'Il y a 5 min',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Rapport mensuel disponible',
      message: 'Le rapport des activités du mois est prêt à être consulté',
      time: 'Il y a 1h',
      read: false,
    },
    {
      id: '3',
      type: 'error',
      title: 'Signalement utilisateur',
      message: '2 signalements ont été reçus concernant un prestataire',
      time: 'Il y a 2h',
      read: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'Objectif atteint',
      message: '100 réservations complétées ce mois !',
      time: 'Il y a 3h',
      read: true,
    },
    {
      id: '5',
      type: 'info',
      title: 'Nouvelle inscription',
      message: '5 nouveaux clients se sont inscrits aujourd\'hui',
      time: 'Il y a 5h',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Error color="error" />;
      case 'success': return <CheckCircle color="success" />;
      default: return <Info color="info" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Notifications sx={{ fontSize: 32, color: 'primary.main' }} />
          </Badge>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Notifications administrateur
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {unreadCount} non lue(s)
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {unreadCount > 0 && (
            <Chip
              label="Tout marquer comme lu"
              onClick={markAllAsRead}
              size="small"
              clickable
            />
          )}
          <IconButton onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <List>
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItem
                sx={{
                  bgcolor: notif.read ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1,
                  border: 1,
                  borderColor: notif.read ? 'transparent' : 'primary.light',
                }}
              >
                <ListItemIcon>
                  {getIcon(notif.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {notif.title}
                      </Typography>
                      <Chip
                        label={notif.type}
                        size="small"
                        color={getColor(notif.type) as 'warning' | 'error' | 'success' | 'info'}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      {notif.message}
                      <br />
                      <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        {notif.time}
                      </Box>
                    </>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}
