'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  TextField,
  IconButton,
  Typography,
  Divider,
  Badge,
} from '@mui/material';
import { Send, EmojiEmotions, Image } from '@mui/icons-material';
import { mockConversations, mockMessages, mockUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types';
import { motion } from 'framer-motion';

export default function ChatPage() {
  const { user } = useAuth();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    mockConversations[0]?.id || null
  );
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const selectedConv = mockConversations.find((c) => c.id === selectedConvId);
  const conversationMessages = messages.filter((m) => m.conversationId === selectedConvId);

  const otherParticipantId = selectedConv?.participants.find((p) => p !== user?.id);
  const otherParticipant = mockUsers.find((u) => u.id === otherParticipantId);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConvId || !user) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConvId,
      senderId: user.id,
      content: message,
      type: 'text',
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: 'calc(100vh - 120px)' }}>
      <Paper sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold">
              Messages
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {mockConversations.map((conv) => {
              const otherUserId = conv.participants.find((p) => p !== user?.id);
              const otherUser = mockUsers.find((u) => u.id === otherUserId);
              const hasUnread = conv.lastMessage && !conv.lastMessage.read && conv.lastMessage.senderId !== user?.id;

              return (
                <ListItem
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: selectedConvId === conv.id ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <ListItemAvatar>
                    <Badge color="error" variant="dot" invisible={!hasUnread}>
                      <Avatar src={otherUser?.photo} alt={otherUser?.name} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={otherUser?.name}
                    secondary={conv.lastMessage?.content}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontWeight: hasUnread ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConv && otherParticipant ? (
            <>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={otherParticipant.photo} alt={otherParticipant.name} />
                  <Box>
                    <Typography variant="h6">{otherParticipant.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      En ligne
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: 'background.default' }}>
                {conversationMessages.map((msg, index) => {
                  const isOwnMessage = msg.senderId === user?.id;
                  const sender = mockUsers.find((u) => u.id === msg.senderId);

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box sx={{ maxWidth: '70%' }}>
                          {!isOwnMessage && (
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              {sender?.name}
                            </Typography>
                          )}
                          <Paper
                            sx={{
                              p: 1.5,
                              bgcolor: isOwnMessage ? 'primary.main' : 'background.paper',
                              color: isOwnMessage ? 'white' : 'text.primary',
                              borderRadius: 2,
                            }}
                          >
                            <Typography variant="body1">{msg.content}</Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.5,
                                opacity: 0.7,
                                textAlign: 'right',
                              }}
                            >
                              {msg.timestamp.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </Typography>
                          </Paper>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>

              <Divider />
              <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" aria-label="Ajouter emoji">
                    <EmojiEmotions />
                  </IconButton>
                  <IconButton size="small" aria-label="Joindre image" component="label">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image />
                    <input type="file" hidden accept="image/*" />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={3}
                    size="small"
                  />
                  <IconButton color="primary" onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Sélectionnez une conversation
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
