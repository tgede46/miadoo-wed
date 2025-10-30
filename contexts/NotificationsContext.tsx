'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '@/types';
import { useAuth } from './AuthContext';

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'userId' | 'createdAt'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      const savedNotifications = localStorage.getItem(`miadoo_notifications_${user.id}`);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    }
  }, [user]);

  const saveNotifications = (notifs: Notification[]) => {
    if (user) {
      localStorage.setItem(`miadoo_notifications_${user.id}`, JSON.stringify(notifs));
      setNotifications(notifs);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newNotification: Notification = {
      ...notification,
      id: `notif-${crypto.randomUUID()}`,
      userId: user.id,
      createdAt: new Date(),
      read: false,
    };

    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
  };

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    saveNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }));
    saveNotifications(updatedNotifications);
  };

  const clearNotifications = () => {
    saveNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
