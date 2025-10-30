# 🌍 Miadoo - Plateforme de Services Culturels

Application Next.js moderne pour la mise en relation de prestataires de services culturels avec des clients.

## 🚀 Fonctionnalités

### ✅ Authentification (Mock)
- Connexion et inscription pour clients et prestataires
- Gestion d'état utilisateur avec Context API
- Stockage local dans localStorage
- Comptes de test disponibles

### 👤 Profils Utilisateurs
- **Prestataires** : nom, photo, description, catégorie, prix, médias, services
- **Clients** : nom, photo, historique des commandes
- **Admin** : gestion complète des utilisateurs

### 🔍 Catalogue & Recherche
- Liste de prestataires sous forme de cartes élégantes
- Moteur de recherche en temps réel
- Filtres par catégorie et plage de prix
- Badges culturels pour chaque prestataire

### 📅 Réservation de Services
- Page de détail complète pour chaque prestataire
- Système de réservation simulé
- Gestion des demandes

### 💬 Chat Intégré
- Interface de messagerie en temps réel (simulée)
- Conversation entre clients et prestataires
- Support texte, emoji et images (mock)

### 📊 Dashboards

#### Prestataire :
- Gestion des services (créer, modifier, supprimer)
- Vue des demandes reçues
- Statistiques de revenus

#### Admin :
- Liste complète des utilisateurs
- Activation/désactivation de comptes
- Statistiques globales

## 🎨 Design & UX

### Thèmes
- **Thème clair** : Fond blanc avec accents orange sable (#ff8c42)
- **Thème sombre** : Fond noir avec accents orange sable
- Basculement facile entre les thèmes

### UI/UX
- Interface basée sur **Material UI (MUI)**
- Animations fluides avec **Framer Motion**
- Cartes arrondies avec ombres légères
- Transitions élégantes sur toutes les interactions
- Icônes Material Icons
- Design responsive pour mobile et desktop

## 🛠️ Technologies

- **Framework** : Next.js 16 avec App Router
- **Language** : TypeScript
- **UI** : Material UI (MUI) v7
- **Animations** : Framer Motion
- **Styling** : Emotion + Tailwind CSS
- **State Management** : React Context API

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔐 Comptes de Test

### Clients
- **Email** : marie@example.com
- **Email** : jean@example.com

### Prestataires
- **Email** : amina@example.com (Coiffure)
- **Email** : fatou@example.com (Massage)
- **Email** : youssef@example.com (Cuisine)
- **Email** : aisha@example.com (Artisanat)
- **Email** : omar@example.com (Beauté)
- **Email** : kwame@example.com (Musique)

### Admin
- **Email** : admin@miadoo.com

**Mot de passe** : N'importe lequel (système mock)

## 📱 Pages

- `/` - Page d'accueil avec catalogue de prestataires
- `/auth` - Connexion et inscription
- `/chat` - Messagerie
- `/dashboard` - Dashboard prestataire
- `/admin` - Dashboard administrateur
- `/prestataire/[id]` - Détail d'un prestataire et réservation

## 🗂️ Structure du Projet

```
miadoo/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   ├── auth/               # Page d'authentification
│   ├── chat/               # Page de chat
│   ├── dashboard/          # Dashboard prestataire
│   ├── admin/              # Dashboard admin
│   └── prestataire/[id]/   # Détail prestataire
├── components/             # Composants React
│   ├── AuthPage.tsx
│   ├── Navbar.tsx
│   ├── CataloguePage.tsx
│   ├── PrestataireCard.tsx
│   ├── ChatPage.tsx
│   ├── PrestataireDashboard.tsx
│   └── AdminDashboard.tsx
├── contexts/               # Contextes React
│   ├── AuthContext.tsx     # Gestion de l'authentification
│   └── ThemeContext.tsx    # Gestion du thème
├── data/                   # Données mock
│   └── mockData.ts
└── types/                  # Types TypeScript
    └── index.ts
```

## 🎯 Fonctionnalités Principales

### 1. Authentification Mock
Système complet d'authentification sans backend réel. Les données sont stockées en mémoire et dans localStorage.

### 2. Catalogue de Services
Recherche et filtrage avancés avec interface moderne et responsive.

### 3. Système de Réservation
Processus de réservation complet avec confirmation et gestion des demandes.

### 4. Chat en Temps Réel (Simulé)
Interface de messagerie complète avec historique des conversations.

### 5. Dashboards Personnalisés
Interfaces dédiées pour prestataires et administrateurs avec statistiques et gestion.

## 🌈 Personnalisation des Couleurs

Les couleurs principales sont définies dans le ThemeContext :

```typescript
primary: {
  main: '#ff8c42',    // Orange sable
  light: '#ffad70',
  dark: '#e67a32',
}
```

## 📝 Notes de Développement

- Toutes les données sont mockées (pas de backend réel)
- Les images utilisent des services externes (Unsplash, Pravatar)
- L'authentification accepte n'importe quel mot de passe non vide
- Les réservations sont simulées et stockées en mémoire
- Le chat est simulé (pas de WebSocket réel)

## 🚧 Améliorations Futures

- Intégration backend réel (API REST ou GraphQL)
- Authentification JWT
- Base de données (PostgreSQL, MongoDB)
- WebSocket pour le chat en temps réel
- Upload de fichiers réel
- Paiement en ligne
- Système de notation et avis
- Géolocalisation des prestataires
- Notifications push
