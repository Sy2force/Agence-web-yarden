# Web Yarden - Agence Digitale

Plateforme complète pour l'agence Web Yarden, spécialisée dans les services digitaux pour les francophones en Israël.

## 🚀 Stack Technique

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **Nodemailer** pour les emails
- **Joi** pour la validation

### Frontend
- **Next.js 14** avec App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** pour les animations
- **React Hook Form** + **Yup**
- **Axios** pour les requêtes API

## 📁 Structure du Projet

```
web-yarden/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── controllers/    # Contrôleurs
│   │   ├── models/         # Modèles MongoDB
│   │   ├── routes/         # Routes Express
│   │   ├── middleware/     # Middlewares
│   │   ├── scripts/        # Scripts (seed, etc.)
│   │   └── server.ts       # Point d'entrée
│   └── package.json
│
├── frontend/               # Application Next.js
│   ├── app/               # Pages et routes
│   ├── components/        # Composants réutilisables
│   ├── lib/              # Utilitaires et API
│   └── package.json
│
└── shared/                # Types partagés
    └── types/
```

## 🛠️ Installation

### Prérequis
- Node.js 18+
- MongoDB installé et lancé
- npm ou yarn

### 1. Cloner le projet
```bash
cd web-yarden
```

### 2. Configuration Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` basé sur `.env.example`:
```env
MONGODB_URI=mongodb://localhost:27017/web-yarden
PORT=5000
JWT_SECRET=your_secret_key_here
ADMIN_EMAIL=admin@webyarden.com
ADMIN_PASSWORD=ChangeMe123!
FRONTEND_URL=http://localhost:3000
```

### 3. Configuration Frontend

```bash
cd ../frontend
npm install
```

Créer un fichier `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 Lancement

### 1. Démarrer MongoDB
```bash
# Si MongoDB n'est pas déjà lancé
mongod
```

### 2. Seed la base de données (optionnel)
```bash
cd backend
npm run seed
```

### 3. Démarrer le Backend
```bash
cd backend
npm run dev
# Le serveur démarre sur http://localhost:5000
```

### 4. Démarrer le Frontend
```bash
cd frontend
npm run dev
# L'application démarre sur http://localhost:3000
```

## 📱 Pages Principales

- **/** - Page d'accueil
- **/services** - Liste des services
- **/packs** - Packs à prix fixe
- **/projects** - Portfolio / Réalisations
- **/simulateur** - Simulateur de devis
- **/contact** - Formulaire de contact
- **/admin** - Interface d'administration

## 💰 Tarification (en ₪)

### Packs
| Pack | Description | Prix |
|------|-------------|------|
| **Starter** | Site vitrine 1 page + domaine + email | 1290 ₪ |
| **Pro** | Site 3 pages + SEO + Google Business | 2790 ₪ |
| **Premium** | Site 5 pages + branding + réseaux + auto | 4990 ₪ |
| **Maintenance** | Hébergement + mises à jour + support | 490 ₪/an |

## 🔐 Administration

### Accès Admin
- URL: `/admin`
- Email par défaut: `admin@webyarden.com`
- Mot de passe: `ChangeMe123!`

⚠️ **Important**: Changer les identifiants admin après la première connexion.

### Fonctionnalités Admin
- Gestion des services
- Gestion des packs
- Gestion des projets/portfolio
- Consultation des messages de contact
- Tableau de bord avec statistiques

## 🌐 API Endpoints

### Public
- `GET /api/services` - Liste des services
- `GET /api/packs` - Liste des packs
- `GET /api/projects` - Liste des projets
- `POST /api/contact` - Envoi de message
- `POST /api/quotes/calculate` - Calcul de devis

### Admin (Auth requise)
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/profile` - Profil utilisateur
- `POST /api/services` - Créer un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service
- (Idem pour packs et projects)

## 🎨 Personnalisation

### Couleurs (Tailwind)
- Primary: Blue-600
- Secondary: Gray-900
- Accent: Blue-500

### Polices
- Font principale: Inter

## 📝 Scripts Disponibles

### Backend
```bash
npm run dev      # Mode développement
npm run build    # Build production
npm run start    # Démarrer en production
npm run seed     # Peupler la base de données
```

### Frontend
```bash
npm run dev      # Mode développement
npm run build    # Build production
npm run start    # Démarrer en production
npm run lint     # Linter
```

## 🤝 Support

Pour toute question ou problème:
- Email: contact@webyarden.com
- WhatsApp: +972 50 123 4567

## 📄 License

© 2024 Web Yarden. Tous droits réservés.
