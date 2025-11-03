#!/bin/bash

# Script de démarrage pour Web Yarden
echo "🚀 Démarrage de Web Yarden..."

# Vérifier si MongoDB est en cours d'exécution
if ! pgrep -x "mongod" > /dev/null
then
    echo "⚠️  MongoDB n'est pas en cours d'exécution."
    echo "Démarrage de MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log --dbpath /usr/local/var/mongodb
fi

# Installation des dépendances backend si nécessaire
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    cd backend && npm install && cd ..
fi

# Installation des dépendances frontend si nécessaire
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    cd frontend && npm install && cd ..
fi

# Créer les fichiers .env s'ils n'existent pas
if [ ! -f "backend/.env" ]; then
    echo "⚙️  Création du fichier backend/.env..."
    cp backend/.env.example backend/.env
    echo "⚠️  N'oubliez pas de configurer backend/.env avec vos paramètres!"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚙️  Création du fichier frontend/.env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > frontend/.env.local
fi

# Seed la base de données (optionnel)
read -p "Voulez-vous initialiser la base de données avec des données de test? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    cd backend && npm run seed && cd ..
fi

# Démarrer les serveurs
echo "✨ Démarrage des serveurs..."
echo "Backend sur http://localhost:5000"
echo "Frontend sur http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"
echo ""

# Démarrer backend et frontend en parallèle
(cd backend && npm run dev) & (cd frontend && npm run dev)
