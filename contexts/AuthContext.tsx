'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, RegisterData } from '@/types';
import { mockUsers, mockAdmin } from '@/data/mockData';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('miadoo_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('miadoo_user');
        return null;
      }
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => user !== null);

  useEffect(() => {
    // Synchroniser isAuthenticated avec user
    setIsAuthenticated(user !== null);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Chercher l'utilisateur dans les mocks
    const foundUser = [...mockUsers, mockAdmin].find((u) => u.email === email);

    if (foundUser && password) {
      // Mock: accepter n'importe quel mot de passe non vide
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('miadoo_user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Vérifier si l'email existe déjà
    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      return false;
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: `user-${crypto.randomUUID()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      isActive: true,
      createdAt: new Date(),
      photo: '',
      ...(data.role === 'prestataire' && {
        description: data.description || '',
        category: data.category || 'autre',
        price: data.price || 0,
        media: [],
        services: [],
      }),
      ...(data.role === 'client' && {
        orderHistory: [],
      }),
    };

    // Ajouter l'utilisateur aux mocks (en mémoire uniquement)
    (mockUsers as User[]).push(newUser);

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('miadoo_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('miadoo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
