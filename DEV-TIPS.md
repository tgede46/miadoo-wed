# 🎓 Astuces & Conseils pour Développeurs - Miadoo

## 🔥 Raccourcis Utiles

### Démarrage rapide
```bash
npm run dev          # Lancer en développement
npm run build        # Build de production
npm run start        # Lancer en production
npm run lint         # Vérifier le code
```

### Dans le code
- `Ctrl + Space` : Autocomplétion TypeScript
- `F12` : Aller à la définition
- `Shift + F12` : Trouver toutes les références
- `Ctrl + .` : Quick fix

## 🧪 Tester Rapidement

### Comptes de test mémorisables
```
Client:      marie@example.com
Prestataire: amina@example.com
Admin:       admin@miadoo.com
Mot de passe: 123 (ou n'importe quoi)
```

### Réinitialiser l'état
```javascript
// Dans la console du navigateur (F12)
localStorage.clear()
location.reload()
```

## 💡 Astuces de Développement

### 1. Hot Reload instantané
Next.js recharge automatiquement. Si ça ne marche pas :
```bash
# Relancez le serveur
Ctrl + C
npm run dev
```

### 2. Déboguer les Context
```typescript
// Ajoutez dans votre composant
const { user } = useAuth();
console.log('Current user:', user);
```

### 3. Voir les erreurs TypeScript
```bash
# Terminal séparé
npx tsc --watch
```

### 4. Inspecter les props MUI
```typescript
// Ajoutez sx={{ border: 1 }} temporairement
<Box sx={{ border: 1, borderColor: 'red' }}>
  {/* Votre contenu */}
</Box>
```

## 🎨 Tester les Thèmes

### Forcer un thème
```typescript
// contexts/ThemeContext.tsx
const [mode, setMode] = useState<'light' | 'dark'>('dark'); // Forcez ici
```

### Voir toutes les couleurs du thème
```typescript
import { useTheme } from '@mui/material/styles';

const theme = useTheme();
console.log('Theme palette:', theme.palette);
```

## 📊 Ajouter des Données de Test

### Ajouter rapidement un prestataire
```typescript
// data/mockData.ts - copiez ce template
{
  id: `prest-${Date.now()}`,
  email: `test${Date.now()}@example.com`,
  name: 'Test User',
  photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  role: 'prestataire',
  isActive: true,
  createdAt: new Date(),
  description: 'Description de test',
  category: 'coiffure',
  price: 50,
  culturalBadge: '🎯',
  rating: 4.5,
  reviewCount: 10,
  media: [],
  services: [],
}
```

## 🔍 Déboguer les Problèmes Courants

### Problème : Erreur "Cannot read property of undefined"
```typescript
// ❌ Mauvais
const name = user.name;

// ✅ Bon
const name = user?.name;
```

### Problème : State ne se met pas à jour
```typescript
// ❌ Mauvais
users.push(newUser);
setUsers(users);

// ✅ Bon
setUsers([...users, newUser]);
```

### Problème : Infinite loop avec useEffect
```typescript
// ❌ Mauvais
useEffect(() => {
  fetchData();
}); // Pas de dépendances

// ✅ Bon
useEffect(() => {
  fetchData();
}, []); // Tableau vide pour une seule fois
```

## 🚀 Optimisations

### 1. Lazy loading des images
```typescript
<Image 
  src={url} 
  alt={name}
  loading="lazy"  // ← Ajoutez ceci
/>
```

### 2. Mémoisation
```typescript
import { useMemo } from 'react';

const filteredItems = useMemo(() => {
  return items.filter(/* votre filtre */);
}, [items, filterCriteria]);
```

### 3. Éviter les re-renders
```typescript
import { memo } from 'react';

const MaComposante = memo(({ data }) => {
  return <div>{data}</div>;
});
```

## 📝 Snippets Utiles

### Nouveau composant
```typescript
'use client';

import React from 'react';
import { Box } from '@mui/material';

interface Props {
  // vos props
}

export default function MonComposant({ }: Props) {
  return (
    <Box>
      {/* Votre contenu */}
    </Box>
  );
}
```

### Nouvelle page
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Box } from '@mui/material';

export default function MaPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <Box>
      <Navbar />
      {/* Votre contenu */}
    </Box>
  );
}
```

### Formulaire avec état
```typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});

const handleChange = (field: string) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData({ ...formData, [field]: e.target.value });
};

<TextField 
  value={formData.field1}
  onChange={handleChange('field1')}
/>
```

## 🎯 VS Code Extensions Recommandées

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "naumovs.color-highlight"
  ]
}
```

## 🔧 Configuration VS Code

### settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 📊 Monitoring Performance

### Dans la console du navigateur
```javascript
// Voir les re-renders
if (process.env.NODE_ENV === 'development') {
  console.count('Render count');
}

// Mesurer le temps
console.time('Operation');
// ... votre code
console.timeEnd('Operation');
```

### React DevTools
1. Installer l'extension Chrome/Firefox
2. Onglet "Profiler" pour analyser les performances
3. Onglet "Components" pour voir la hiérarchie

## 🎨 Tester Différents Écrans

### Dans Chrome DevTools (F12)
1. `Ctrl + Shift + M` : Toggle device toolbar
2. Tester sur :
   - Mobile : iPhone SE (375px)
   - Tablet : iPad (768px)
   - Desktop : 1920px

### Raccourcis responsive
```typescript
// Breakpoints MUI
xs: 0px      // Mobile
sm: 600px    // Tablet
md: 900px    // Desktop small
lg: 1200px   // Desktop
xl: 1536px   // Desktop large
```

## 🚨 Erreurs Courantes et Solutions

### TypeError: Cannot read properties of null
```typescript
// Cause : Composant rendu avant chargement des données
// Solution : Ajouter un guard
if (!data) return <CircularProgress />;
```

### Hydration Error (Next.js)
```typescript
// Cause : Différence entre server et client
// Solution : Utiliser useEffect ou suppressHydrationWarning
<div suppressHydrationWarning>
  {typeof window !== 'undefined' && <ClientOnly />}
</div>
```

### ESLint errors après installation
```bash
# Relancer le serveur
npm run dev
```

## 🎓 Bonnes Pratiques

### 1. Nommage des fichiers
```
- Composants : PascalCase (MonComposant.tsx)
- Utilitaires : camelCase (monUtilitaire.ts)
- Pages : kebab-case (ma-page/page.tsx)
```

### 2. Structure des imports
```typescript
// 1. Imports externes
import React from 'react';
import { Box } from '@mui/material';

// 2. Imports internes
import { useAuth } from '@/contexts/AuthContext';
import MonComposant from '@/components/MonComposant';

// 3. Types
import type { User } from '@/types';
```

### 3. Commentaires utiles
```typescript
// TODO: Implémenter la pagination
// FIXME: Bug sur mobile
// NOTE: Cette fonction est appelée depuis X
```

## 📚 Ressources Rapides

### Documentation
- [Next.js](https://nextjs.org/docs)
- [MUI](https://mui.com/material-ui/getting-started/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Outils en ligne
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [MUI Theme Creator](https://zenoo.github.io/mui-theme-creator/)
- [Can I Use](https://caniuse.com/) - Compatibilité navigateurs

## 🎯 Checklist avant commit

- [ ] Code compile sans erreurs TypeScript
- [ ] Pas d'erreurs console dans le navigateur
- [ ] Testé sur mobile et desktop
- [ ] Thème clair et sombre fonctionnent
- [ ] Navigation fonctionne
- [ ] Données mock cohérentes

---

**Happy coding ! 💻✨**
