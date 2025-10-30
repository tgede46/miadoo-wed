'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  TextField,
  Button,
  Badge,
  Divider,
} from '@mui/material';
import {
  Message,
  Send,
  MarkEmailRead,
  Delete,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface AdminMessage {
  id: string;
  from: string;
  fromEmail: string;
  fromPhoto: string;
  subject: string;
  message: string;
  time: string;
  read: boolean;
  type: 'support' | 'report' | 'question';
}

export default function AdminMessaging() {
  const [messages, setMessages] = useState<AdminMessage[]>([
    {
      id: '1',
      from: 'Marie Dubois',
      fromEmail: 'marie@example.com',
      fromPhoto: 'https://i.pravatar.cc/150?img=5',
      subject: 'Problème de paiement',
      message: 'Bonjour, j\'ai un problème avec le paiement de ma dernière réservation. Pouvez-vous m\'aider ?',
      time: 'Il y a 10 min',
      read: false,
      type: 'support',
    },
    {
      id: '2',
      from: 'Jean Martin',
      fromEmail: 'jean@example.com',
      fromPhoto: 'https://i.pravatar.cc/150?img=12',
      subject: 'Signalement utilisateur',
      message: 'Je souhaite signaler un comportement inapproprié d\'un prestataire lors de notre échange.',
      time: 'Il y a 25 min',
      read: false,
      type: 'report',
    },
    {
      id: '3',
      from: 'Sophie Laurent',
      fromEmail: 'sophie@example.com',
      fromPhoto: 'https://i.pravatar.cc/150?img=9',
      subject: 'Question sur les commissions',
      message: 'Bonjour, je voudrais comprendre comment sont calculées les commissions sur la plateforme.',
      time: 'Il y a 1h',
      read: false,
      type: 'question',
    },
    {
      id: '4',
      from: 'Pierre Durand',
      fromEmail: 'pierre@example.com',
      fromPhoto: 'https://i.pravatar.cc/150?img=15',
      subject: 'Demande de vérification compte',
      message: 'Mon compte prestataire est en attente de vérification depuis 3 jours. Pouvez-vous accélérer le processus ?',
      time: 'Il y a 2h',
      read: true,
      type: 'support',
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messages.filter(m => !m.read).length;

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce message ?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      alert(`Réponse envoyée à ${selectedMessage.fromEmail}: ${replyText}`);
      setReplyText('');
      handleMarkAsRead(selectedMessage.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'support': return 'primary';
      case 'report': return 'error';
      case 'question': return 'info';
      default: return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'support': return 'Support';
      case 'report': return 'Signalement';
      case 'question': return 'Question';
      default: return type;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Message sx={{ fontSize: 32, color: 'primary.main' }} />
          </Badge>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              💬 Messagerie Admin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {unreadCount} message(s) non lu(s)
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setMessages(messages.map(m => ({ ...m, read: true })))}
          disabled={unreadCount === 0}
        >
          Tout marquer comme lu
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, height: 500 }}>
        {/* Liste des messages */}
        <Box sx={{ width: '50%', overflow: 'auto', pr: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ListItem
                  sx={{
                    bgcolor: msg.read ? 'transparent' : 'action.hover',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'pointer',
                    border: 1,
                    borderColor: selectedMessage?.id === msg.id ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <ListItemAvatar>
                    <Avatar src={msg.fromPhoto} alt={msg.from} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" fontWeight={msg.read ? 'normal' : 'bold'}>
                          {msg.from}
                        </Typography>
                        <Chip
                          label={getTypeLabel(msg.type)}
                          size="small"
                          color={getTypeColor(msg.type) as 'primary' | 'error' | 'info'}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ fontWeight: msg.read ? 'normal' : 'bold' }}>
                          {msg.subject}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {msg.time}
                        </Typography>
                      </>
                    }
                  />
                  <Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(msg.id);
                      }}
                      color={msg.read ? 'default' : 'primary'}
                    >
                      <MarkEmailRead fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(msg.id);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Détail du message */}
        <Box sx={{ width: '50%', pl: 2 }}>
          {selectedMessage ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={selectedMessage.fromPhoto} alt={selectedMessage.from} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedMessage.from}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedMessage.fromEmail}
                  </Typography>
                </Box>
                <Chip
                  label={getTypeLabel(selectedMessage.type)}
                  color={getTypeColor(selectedMessage.type) as 'primary' | 'error' | 'info'}
                  size="small"
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                {selectedMessage.subject}
              </Typography>

              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                {selectedMessage.time}
              </Typography>

              <Paper sx={{ p: 2, mb: 3, bgcolor: 'action.hover' }}>
                <Typography variant="body1">
                  {selectedMessage.message}
                </Typography>
              </Paper>

              <Typography variant="subtitle2" gutterBottom>
                Répondre :
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Écrivez votre réponse..."
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                fullWidth
              >
                Envoyer la réponse
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="body1" color="text.secondary">
                Sélectionnez un message pour le lire et y répondre
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
