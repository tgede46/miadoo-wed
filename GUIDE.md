# 🎯 Guide de Démarrage Rapide - Miadoo

## ✅ L'application est prête !

Le serveur de développement est en cours d'exécution sur :
- **Local**: http://localhost:3000
- **Réseau**: http://192.168.1.98:3000

## 🚀 Comment utiliser l'application

### 1. Page de Connexion
Accédez à http://localhost:3000 - vous serez automatiquement redirigé vers `/auth`

### 2. Comptes de Test Disponibles

#### Compte Client
```
Email: marie@example.com
Mot de passe: (n'importe lequel)
```

#### Compte Prestataire
```
Email: amina@example.com
Mot de passe: (n'importe lequel)
```

#### Compte Admin
```
Email: admin@miadoo.com
Mot de passe: (n'importe lequel)
```

### 3. Fonctionnalités par Rôle

#### 👤 En tant que CLIENT
1. **Page d'accueil** : Parcourir le catalogue de prestataires
2. **Recherche** : Utiliser la barre de recherche et les filtres (catégorie, prix)
3. **Détail prestataire** : Cliquer sur une carte pour voir les détails
4. **Réserver** : Cliquer sur "Réserver" pour un service
5. **Chat** : Accéder à la messagerie via l'icône chat (badge de notification)

#### 🏪 En tant que PRESTATAIRE
1. **Dashboard** : Accessible via le bouton "Dashboard" dans la navbar
2. **Gérer les services** :
   - Ajouter un nouveau service
   - Modifier un service existant
   - Supprimer un service
3. **Voir les demandes** : Consulter les réservations reçues
4. **Statistiques** : Voir les revenus et le nombre de services
5. **Chat** : Répondre aux messages des clients

#### 👨‍💼 En tant qu'ADMIN
1. **Dashboard Admin** : Accessible via "Dashboard" dans la navbar
2. **Gestion utilisateurs** :
   - Voir tous les utilisateurs
   - Activer/Désactiver des comptes
   - Voir les statistiques globales

### 4. Thème Clair/Sombre
- Cliquer sur l'icône 🌙/☀️ dans la navbar pour basculer
- Le choix est sauvegardé automatiquement

### 5. Navigation

```
┌─────────────────────────────────────┐
│           🌍 Miadoo                 │
│  [Chat] [Dashboard] [Theme] [User] │
└─────────────────────────────────────┘
         ▼
    ┌────────────┐
    │  Catalogue │ (Page d'accueil)
    └────────────┘
         ▼
    ┌────────────┐
    │ Prestataire│ (Détail + Réservation)
    └────────────┘
```

## 🎨 Personnalisation

### Changer les couleurs
Éditez `/contexts/ThemeContext.tsx` :

```typescript
primary: {
  main: '#ff8c42',    // Votre couleur principale
  light: '#ffad70',
  dark: '#e67a32',
}
```

### Ajouter des prestataires
Éditez `/data/mockData.ts` et ajoutez dans `mockPrestataires`

### Ajouter des catégories
1. Modifier `/types/index.ts` - type `ServiceCategory`
2. Mettre à jour les sélecteurs de catégorie dans les composants

## 🐛 Résolution de Problèmes

### Problème : La page est blanche
**Solution** : Vérifiez la console du navigateur (F12)

### Problème : Erreur de compilation TypeScript
**Solution** : Les erreurs ESLint peuvent être ignorées en développement. L'app fonctionne correctement.

### Problème : Les images ne s'affichent pas
**Solution** : Vérifiez votre connexion internet (les images viennent d'Unsplash/Pravatar)

### Problème : Le localStorage ne fonctionne pas
**Solution** : Désactivez le mode navigation privée de votre navigateur

## 📱 Test sur Mobile

Pour tester sur votre téléphone :
1. Connectez votre téléphone au même réseau WiFi
2. Accédez à http://192.168.1.98:3000
3. L'interface est entièrement responsive

## 🔄 Redémarrer le Serveur

Si nécessaire :
```bash
# Arrêter : Ctrl + C dans le terminal
# Relancer :
npm run dev
```

## 📊 Structure des Données Mock

Toutes les données sont dans `/data/mockData.ts` :
- `mockClients` : Clients
- `mockPrestataires` : Prestataires
- `mockServices` : Services
- `mockOrders` : Commandes
- `mockMessages` : Messages
- `mockConversations` : Conversations

## 🎯 Prochaines Étapes

1. **Tester tous les rôles** : Client, Prestataire, Admin
2. **Explorer toutes les pages**
3. **Créer un service** (en tant que prestataire)
4. **Faire une réservation** (en tant que client)
5. **Envoyer un message** dans le chat

## 💡 Astuces

- Les animations Framer Motion se déclenchent au survol et au clic
- Le thème sombre/clair est persisté dans localStorage
- Vous pouvez vous inscrire avec de nouveaux comptes
- Les nouveaux utilisateurs apparaissent dans le dashboard admin

## 🎉 Fonctionnalités Complètes Implémentées

✅ Authentification mock
✅ Profils utilisateurs (Client, Prestataire, Admin)
✅ Catalogue avec recherche et filtres
✅ Système de réservation
✅ Chat intégré
✅ Dashboard prestataire
✅ Dashboard admin
✅ Thème clair/sombre
✅ Animations fluides
✅ Design responsive
✅ Material UI
✅ Framer Motion
✅ TypeScript

**Profitez de Miadoo ! 🌍**
