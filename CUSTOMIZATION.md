# 🎨 Guide de Personnalisation - Miadoo

Ce guide vous explique comment personnaliser l'application selon vos besoins.

## 🎨 Personnaliser les Couleurs

### Couleur principale (Orange Sable)

Éditez `/contexts/ThemeContext.tsx` :

```typescript
primary: {
  main: '#ff8c42',    // Changez cette valeur
  light: '#ffad70',   // Version claire
  dark: '#e67a32',    // Version foncée
}
```

### Exemples de palettes

```typescript
// Violet professionnel
primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' }

// Vert nature
primary: { main: '#10b981', light: '#34d399', dark: '#059669' }

// Rose moderne
primary: { main: '#ec4899', light: '#f472b6', dark: '#db2777' }

// Bleu océan
primary: { main: '#0ea5e9', light: '#38bdf8', dark: '#0284c7' }
```

### Couleurs des catégories

Dans `/components/PrestataireCard.tsx` :

```typescript
const categoryColors: Record<string, string> = {
  coiffure: '#9c27b0',    // Violet
  beauté: '#e91e63',      // Rose
  massage: '#00bcd4',     // Cyan
  cuisine: '#ff9800',     // Orange
  artisanat: '#795548',   // Marron
  musique: '#3f51b5',     // Bleu
  autre: '#607d8b',       // Gris-bleu
};
```

## 📊 Ajouter des Prestataires

### 1. Ouvrez `/data/mockData.ts`

### 2. Ajoutez dans `mockPrestataires` :

```typescript
{
  id: 'prest-7',
  email: 'nouveau@example.com',
  name: 'Nouveau Prestataire',
  photo: 'https://i.pravatar.cc/150?img=20',
  role: 'prestataire',
  isActive: true,
  createdAt: new Date('2024-03-01'),
  description: 'Description détaillée du prestataire',
  category: 'cuisine', // coiffure, beauté, massage, cuisine, artisanat, musique, autre
  price: 45,
  culturalBadge: '🇫🇷',
  rating: 4.5,
  reviewCount: 42,
  media: [
    { id: 'm9', type: 'image', url: 'https://images.unsplash.com/photo-xxx' },
  ],
  services: [],
}
```

### 3. Ajoutez ses services dans `mockServices` :

```typescript
{
  id: 'serv-8',
  prestataireId: 'prest-7',
  name: 'Nom du service',
  description: 'Description du service',
  category: 'cuisine',
  price: 45,
  duration: 90,
  media: [], // Référence aux médias
}
```

## 🏷️ Ajouter une Catégorie

### 1. Modifiez `/types/index.ts` :

```typescript
export type ServiceCategory = 
  | 'coiffure'
  | 'beauté'
  | 'massage'
  | 'cuisine'
  | 'artisanat'
  | 'musique'
  | 'votre-nouvelle-categorie'  // ← Ajoutez ici
  | 'autre';
```

### 2. Ajoutez la couleur dans `/components/PrestataireCard.tsx` :

```typescript
const categoryColors: Record<string, string> = {
  // ... catégories existantes
  'votre-nouvelle-categorie': '#votre-couleur',
};
```

### 3. Ajoutez dans les formulaires :

- `/components/AuthPage.tsx` (ligne ~21)
- `/components/CataloguePage.tsx` (ligne ~77)
- `/components/PrestataireDashboard.tsx` (ligne ~266)

```typescript
<MenuItem value="votre-nouvelle-categorie">Votre Label</MenuItem>
```

## 🖼️ Changer les Images

### Images de profil (Avatars)

Utilisez Pravatar ou vos propres URLs :
```typescript
photo: 'https://i.pravatar.cc/150?img=X'  // X = 1-70
// ou
photo: 'https://votre-cdn.com/avatar.jpg'
```

### Images de portfolio

Utilisez Unsplash ou vos propres URLs :
```typescript
media: [
  { 
    id: 'm1', 
    type: 'image', 
    url: 'https://images.unsplash.com/photo-XXXXXXX?w=500' 
  }
]
```

### Rechercher sur Unsplash

1. Allez sur [unsplash.com](https://unsplash.com)
2. Cherchez votre image
3. Clic droit → "Copier l'adresse de l'image"
4. Ajoutez `?w=500` à la fin pour optimiser

## 🌐 Changer la Langue

### Textes de l'interface

Créez un fichier `/locales/fr.ts` :

```typescript
export const translations = {
  auth: {
    login: 'Connexion',
    register: 'Inscription',
    email: 'Email',
    password: 'Mot de passe',
    // ... etc
  },
  // ... autres sections
};
```

Puis importez et utilisez :
```typescript
import { translations } from '@/locales/fr';

<Button>{translations.auth.login}</Button>
```

## 🎭 Personnaliser les Animations

### Dans `/contexts/ThemeContext.tsx`

Modifier la durée des transitions :

```typescript
components: {
  MuiCard: {
    styleOverrides: {
      root: {
        transition: 'all 0.5s ease', // Changez 0.3s → 0.5s
      },
    },
  },
}
```

### Dans les composants avec Framer Motion

Exemple dans `/components/CataloguePage.tsx` :

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.8,        // Durée
    delay: index * 0.1,   // Délai stagger
    type: 'spring',       // Type d'animation
    stiffness: 100        // Rigidité du ressort
  }}
>
```

## 📝 Personnaliser le Logo

### 1. Remplacez l'emoji dans `/components/Navbar.tsx` :

```typescript
<Typography>
  🌍 Miadoo  {/* Changez 🌍 par votre logo/emoji */}
</Typography>
```

### 2. Ou utilisez une image :

```typescript
import Image from 'next/image';

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Image src="/logo.png" alt="Logo" width={32} height={32} />
  <Typography>Miadoo</Typography>
</Box>
```

## 🔧 Modifier les Règles de Validation

### Dans `/components/AuthPage.tsx`

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Ajoutez vos validations personnalisées
  if (!email.includes('@')) {
    setError('Email invalide');
    return;
  }
  
  if (password.length < 6) {
    setError('Mot de passe trop court');
    return;
  }
  
  // ... reste du code
};
```

## 📱 Personnaliser la Mise en Page

### Changer le nombre de colonnes du catalogue

Dans `/components/CataloguePage.tsx` :

```typescript
<Grid item xs={12} sm={6} md={4} lg={3}>
  {/* 
    xs={12} → Mobile: 1 colonne
    sm={6}  → Tablette: 2 colonnes
    md={4}  → Desktop: 3 colonnes
    lg={3}  → Large: 4 colonnes
  */}
</Grid>
```

Changez selon vos besoins :
- `xs={12} sm={6} md={6} lg={4}` → 1/2/2/3 colonnes
- `xs={12} sm={12} md={4} lg={3}` → 1/1/3/4 colonnes

## 🎯 Ajouter des Champs aux Profils

### 1. Modifiez `/types/index.ts`

```typescript
export interface Prestataire extends User {
  // ... champs existants
  telephone?: string;           // Nouveau champ
  adresse?: string;            // Nouveau champ
  anneeExperience?: number;    // Nouveau champ
}
```

### 2. Mettez à jour les mocks dans `/data/mockData.ts`

```typescript
{
  // ... données existantes
  telephone: '+33 6 12 34 56 78',
  adresse: '123 Rue Example, Paris',
  anneeExperience: 10,
}
```

### 3. Affichez dans l'UI

Dans `/app/prestataire/[id]/page.tsx` :

```typescript
<Typography variant="body1">
  📞 {prestataire.telephone}
</Typography>
<Typography variant="body1">
  📍 {prestataire.adresse}
</Typography>
<Typography variant="body1">
  ⏱️ {prestataire.anneeExperience} ans d'expérience
</Typography>
```

## 💬 Personnaliser le Chat

### Ajouter des réactions

Dans `/components/ChatPage.tsx`, ajoutez un bouton :

```typescript
const [reactions] = useState(['👍', '❤️', '😊', '🎉', '🔥']);

// Dans le rendu
<Box>
  {reactions.map(emoji => (
    <IconButton 
      key={emoji} 
      onClick={() => handleSendMessage(emoji)}
    >
      {emoji}
    </IconButton>
  ))}
</Box>
```

## 📊 Ajouter des Statistiques

Dans `/components/PrestataireDashboard.tsx`, ajoutez une carte :

```typescript
<Grid item xs={12} md={4}>
  <Card>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        Votre nouvelle statistique
      </Typography>
      <Typography variant="h3" color="primary">
        42
      </Typography>
    </CardContent>
  </Card>
</Grid>
```

## 🎨 Créer votre propre Thème

```typescript
// contexts/ThemeContext.tsx

const customTheme = createTheme({
  palette: {
    mode,
    primary: { main: '#votre-couleur' },
    secondary: { main: '#votre-couleur-2' },
    background: {
      default: mode === 'light' ? '#f8f9fa' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#1c1c1c',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },  // Plus arrondi
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    // ... personnalisez les ombres
  ],
});
```

## 🚀 Conseils de Personnalisation

1. **Testez toujours** : Après chaque modification, vérifiez que l'app fonctionne
2. **Gardez la cohérence** : Utilisez les mêmes espacements et couleurs
3. **Mobile first** : Pensez toujours au mobile
4. **Accessibilité** : Gardez un bon contraste de couleurs
5. **Performance** : Optimisez vos images

## 📚 Ressources Utiles

- [Material UI Docs](https://mui.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Unsplash](https://unsplash.com) - Images gratuites
- [Coolors](https://coolors.co) - Générateur de palettes
- [Google Fonts](https://fonts.google.com) - Polices gratuites

---

**Amusez-vous à personnaliser Miadoo ! 🎨**
