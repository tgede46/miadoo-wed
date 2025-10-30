'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Dashboard,
  ExitToApp,
  Home,
  Notifications,
  Person,
  Settings,
  People,
  Assessment,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    router.push('/auth');
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotifAnchorEl(null);
  };

  const handleNotificationItemClick = (notificationId: string, link?: string) => {
    markAsRead(notificationId);
    if (link) {
      router.push(link);
    }
    handleNotificationClose();
  };

  const openNotifications = Boolean(notifAnchorEl);

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
          🌍 Miadoo Admin
        </Typography>

        {/* Navigation Links - Admin */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<Home />}
            sx={{ textTransform: 'none' }}
          >
            Accueil
          </Button>
          {mounted && (
            <>
              <Button
                component={Link}
                href="/admin"
                startIcon={<Dashboard />}
                sx={{ textTransform: 'none' }}
              >
                Dashboard Admin
              </Button>
              <Button
                component={Link}
                href="/admin"
                startIcon={<People />}
                sx={{ textTransform: 'none' }}
              >
                Utilisateurs
              </Button>
              <Button
                component={Link}
                href="/admin"
                startIcon={<Assessment />}
                sx={{ textTransform: 'none' }}
              >
                Rapports
              </Button>
            </>
          )}
        </Box>

        {/* Theme Toggle */}
        <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Notifications */}
        {mounted && (
          <IconButton onClick={handleNotificationClick} color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        )}

        {mounted && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              src={user.photo}
              alt={user.name}
              onClick={handleMenu}
              sx={{ cursor: 'pointer', width: 36, height: 36 }}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { handleClose(); router.push('/profil'); }}>
                <Person sx={{ mr: 1 }} fontSize="small" />
                Mon Profil
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); router.push('/admin'); }}>
                <Settings sx={{ mr: 1 }} fontSize="small" />
                Paramètres
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {user.name}
                </Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="caption" color="text.secondary">
                  Administrateur
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} fontSize="small" />
                Déconnexion
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>

      {/* Notifications Popover */}
      <Popover
        open={openNotifications}
        anchorEl={notifAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 350, maxHeight: 400, overflow: 'auto' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={markAllAsRead}>
                Tout marquer comme lu
              </Button>
            )}
          </Box>
          <Divider />
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Aucune notification
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.slice(0, 10).map((notif, index) => (
                <React.Fragment key={notif.id}>
                  <ListItem
                    onClick={() => handleNotificationItemClick(notif.id, notif.link)}
                    sx={{
                      bgcolor: notif.read ? 'transparent' : 'action.hover',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.selected',
                      },
                    }}
                  >
                    <ListItemText
                      primary={notif.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {notif.message}
                          </Typography>
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {new Date(notif.createdAt).toLocaleDateString('fr-FR')}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Popover>
    </AppBar>
  );
}
