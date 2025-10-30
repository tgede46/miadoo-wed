'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (prestataireId: string) => void;
  isFavorite: (prestataireId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Charger ou réinitialiser les favoris quand l'utilisateur change
    if (!user || user.role !== 'client') {
      setFavorites([]);
      return;
    }
    const savedFavorites = localStorage.getItem(`miadoo_favorites_${user.id}`);
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  }, [user]);

  const toggleFavorite = (prestataireId: string) => {
    if (!user) return;

    setFavorites((prev) => {
      const newFavorites = prev.includes(prestataireId)
        ? prev.filter((id) => id !== prestataireId)
        : [...prev, prestataireId];

      localStorage.setItem(`miadoo_favorites_${user.id}`, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (prestataireId: string) => {
    return favorites.includes(prestataireId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
