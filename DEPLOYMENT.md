# Guide de Déploiement - Web Yarden

## Table des matières
- [Prérequis](#prérequis)
- [Déploiement Local](#déploiement-local)
- [Déploiement Production](#déploiement-production)
- [Configuration Serveur](#configuration-serveur)
- [Monitoring](#monitoring)
- [Backup](#backup)

## Prérequis

### Environnement Système
- Node.js 18+ 
- MongoDB 5.0+
- npm 8+ ou yarn
- Git
- PM2 (pour production)
- Nginx (reverse proxy)

### Services Externes
- Compte MongoDB Atlas (optionnel)
- Service SMTP pour emails
- Domaine et certificat SSL

## Déploiement Local

### 1. Cloner le projet
```bash
git clone https://github.com/votre-repo/web-yarden.git
cd web-yarden
```

### 2. Configuration Backend
```bash
cd backend
npm install
cp .env.example .env
# Modifier .env avec vos paramètres
npm run seed  # Initialiser la base de données
npm run dev   # Lancer en développement
```

### 3. Configuration Frontend
```bash
cd ../frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
npm run dev
```

### 4. Accès
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Admin: http://localhost:3000/admin

## Déploiement Production

### 1. Préparation Serveur VPS/Cloud

#### Installation dépendances
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm mongodb nginx certbot python3-certbot-nginx git
sudo npm install -g pm2
```

### 2. Configuration MongoDB

#### Option A: MongoDB Local
```bash
sudo systemctl enable mongodb
sudo systemctl start mongodb
mongo
> use web-yarden
> db.createUser({
    user: "webyarden",
    pwd: "VotreMotDePasseSecure",
    roles: [{role: "readWrite", db: "web-yarden"}]
  })
```

#### Option B: MongoDB Atlas
1. Créer cluster sur mongodb.com
2. Configurer accès réseau (whitelist IP)
3. Créer utilisateur database
4. Récupérer connection string

### 3. Déploiement Backend

```bash
cd /var/www
sudo git clone https://github.com/votre-repo/web-yarden.git
cd web-yarden/backend
sudo npm install --production
```

#### Configuration Production
```bash
sudo nano .env
```

```env
# Production Settings
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://webyarden:password@localhost:27017/web-yarden
JWT_SECRET=generation-aleatoire-securisee-64-caracteres
CLIENT_URL=https://votre-domaine.com
```

#### Lancer avec PM2
```bash
npm run build
pm2 start dist/server.js --name web-yarden-api
pm2 save
pm2 startup
```

### 4. Déploiement Frontend

```bash
cd /var/www/web-yarden/frontend
sudo npm install --production
echo "NEXT_PUBLIC_API_URL=https://api.votre-domaine.com" > .env.production
npm run build
```

#### PM2 pour Next.js
```bash
pm2 start npm --name web-yarden-frontend -- start
pm2 save
```

### 5. Configuration Nginx

```nginx
# /etc/nginx/sites-available/web-yarden
server {
    server_name votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    server_name api.votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Activer et SSL
```bash
sudo ln -s /etc/nginx/sites-available/web-yarden /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d votre-domaine.com -d api.votre-domaine.com
```

## Configuration Serveur

### Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Optimisation MongoDB
```javascript
// /etc/mongod.conf
storage:
  engine: wiredTiger
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1
    collectionConfig:
      blockCompressor: zlib

net:
  bindIp: 127.0.0.1
  port: 27017

security:
  authorization: enabled
```

### Variables Environnement Production
```bash
# .env.production
NODE_ENV=production
MONGODB_URI=mongodb://user:pass@localhost:27017/web-yarden
JWT_SECRET=<64-caracteres-aleatoires>
JWT_EXPIRE=7d

# Admin
ADMIN_EMAIL=admin@webyarden.com
ADMIN_PASSWORD=<mot-de-passe-fort>

# Email SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@webyarden.com
EMAIL_PASS=<app-password>

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=https://webyarden.com

# Cache
CACHE_TTL=600

# Logs
LOG_LEVEL=info
```

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs web-yarden-api
pm2 logs web-yarden-frontend
```

### Logs Nginx
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Health Check Endpoint
```bash
curl https://api.votre-domaine.com/api/health
```

### Monitoring Automatique
```bash
# Installer monitoring
npm install -g pm2-logrotate
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Backup

### Script Backup Automatique
```bash
#!/bin/bash
# /home/backup/backup-webyarden.sh

BACKUP_DIR="/home/backup/webyarden"
DATE=$(date +%Y%m%d_%H%M%S)
MONGO_DB="web-yarden"

# Backup MongoDB
mongodump --db $MONGO_DB --out $BACKUP_DIR/db_$DATE

# Backup fichiers
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/web-yarden

# Nettoyer backups > 7 jours
find $BACKUP_DIR -type f -mtime +7 -delete
```

### Cron pour Backup
```bash
# crontab -e
0 2 * * * /home/backup/backup-webyarden.sh
```

## Commandes Utiles

### Redémarrer Services
```bash
pm2 restart web-yarden-api
pm2 restart web-yarden-frontend
sudo systemctl restart nginx
sudo systemctl restart mongodb
```

### Mise à Jour
```bash
cd /var/www/web-yarden
git pull origin main
cd backend && npm install && npm run build && pm2 restart web-yarden-api
cd ../frontend && npm install && npm run build && pm2 restart web-yarden-frontend
```

### Debug
```bash
# Vérifier ports
sudo netstat -tlnp | grep -E '3000|5000'

# Logs PM2
pm2 logs --lines 100

# Test MongoDB
mongo --eval "db.stats()"

# Test API
curl -X GET http://localhost:5000/api/health
```

## Sécurité

### Checklist Sécurité
- [x] HTTPS activé avec certificat SSL
- [x] Variables environnement sécurisées
- [x] MongoDB avec authentification
- [x] Rate limiting configuré
- [x] CORS configuré correctement
- [x] Helmet.js pour headers sécurité
- [x] Validation données avec Joi
- [x] JWT avec expiration
- [x] Mots de passe hashés bcrypt
- [x] Firewall configuré
- [x] Backups automatiques
- [x] Logs et monitoring

### Maintenance
- Mettre à jour dépendances régulièrement
- Vérifier logs erreurs quotidiennement  
- Tester restauration backup mensuellement
- Renouveler certificats SSL (auto avec certbot)
- Monitorer utilisation ressources

## Support

Pour toute question ou problème:
- Email: support@webyarden.com
- Documentation API: https://api.votre-domaine.com/docs
- Logs: /var/www/web-yarden/logs/
