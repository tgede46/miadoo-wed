// Types pour l'application Miadoo

export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  role: 'client' | 'prestataire' | 'admin';
  isActive: boolean;
  createdAt: Date;
}

export interface Client extends User {
  role: 'client';
  orderHistory: Order[];
  favorites: string[]; // IDs des prestataires favoris
  notifications: Notification[];
}

export interface Prestataire extends User {
  role: 'prestataire';
  description: string;
  category: ServiceCategory;
  price: number;
  media: Media[];
  culturalBadge?: string;
  services: Service[];
  rating?: number;
  reviewCount?: number;
  reviews: Review[];
  notifications: Notification[];
  businessHours?: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
}

export interface Admin extends User {
  role: 'admin';
}

export type ServiceCategory = 
  | 'coiffure'
  | 'beauté'
  | 'massage'
  | 'cuisine'
  | 'artisanat'
  | 'musique'
  | 'autre';

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Service {
  id: string;
  prestataireId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number; // en minutes
  media: Media[];
}

export interface Order {
  id: string;
  serviceId: string;
  clientId: string;
  prestataireId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date: Date;
  totalPrice: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'emoji' | 'image';
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage?: Message;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'prestataire';
  description?: string;
  category?: ServiceCategory;
  price?: number;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface Review {
  id: string;
  prestataireId: string;
  clientId: string;
  clientName: string;
  clientPhoto?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}
