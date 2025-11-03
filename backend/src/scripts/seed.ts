import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model';
import Service from '../models/Service.model';
import Pack from '../models/Pack.model';
import Project from '../models/Project.model';
import Discount from '../models/Discount.model';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/web-yarden');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Pack.deleteMany({});
    await Project.deleteMany({});
    await Discount.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@webyarden.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      name: 'Admin Web Yarden',
      role: 'admin'
    });
    console.log('Creating admin user...');

    // Create services
    const services = await Service.insertMany([
      {
        title: 'Création de site vitrine',
        slug: 'creation-site-vitrine',
        description: 'Site web professionnel pour présenter votre activité',
        longDescription: 'Nous créons des sites vitrines modernes et responsives qui mettent en valeur votre entreprise. Design personnalisé, optimisé pour les mobiles et référencement local inclus.',
        icon: '',
        priceRange: { min: 1200, max: 3500 },
        features: [
          'Design moderne et responsive',
          'Optimisation mobile',
          'Référencement local de base',
          'Formulaire de contact',
          'Hébergement 1 an inclus'
        ],
        order: 1,
        isActive: true
      },
      {
        title: 'Création de site e-commerce',
        slug: 'creation-site-ecommerce',
        description: 'Boutique en ligne complète pour vendre vos produits',
        longDescription: 'Solution e-commerce complète avec gestion des produits, paiements sécurisés, et tableau de bord. Parfait pour développer votre activité en ligne.',
        icon: '🛒',
        priceRange: { min: 2500, max: 6000 },
        features: [
          'Catalogue produits illimité',
          'Paiement sécurisé',
          'Gestion des stocks',
          'Tableau de bord vendeur',
          'Multi-langue'
        ],
        order: 2,
        isActive: true
      },
      {
        title: 'Création de logo et identité visuelle',
        slug: 'creation-logo-identite-visuelle',
        description: 'Logo professionnel et charte graphique complète',
        longDescription: 'Création d\'une identité visuelle unique pour votre marque : logo, palette de couleurs, typographie, et déclinaisons pour tous vos supports.',
        icon: '',
        priceRange: { min: 500, max: 1500 },
        features: [
          '3 propositions de logo',
          'Révisions illimitées',
          'Fichiers haute résolution',
          'Charte graphique',
          'Déclinaisons réseaux sociaux'
        ],
        order: 3,
        isActive: true
      },
      {
        title: 'Référencement local SEO',
        slug: 'referencement-local-seo',
        description: 'Soyez visible sur Google Maps et recherches locales',
        longDescription: 'Optimisation complète pour apparaître en première page sur les recherches locales. Google My Business, optimisation on-page, et création de contenu local.',
        icon: '📍',
        priceRange: { min: 800, max: 2000 },
        features: [
          'Google My Business optimisé',
          'SEO local on-page',
          'Création de contenu local',
          'Citations locales',
          'Rapport mensuel'
        ],
        order: 4,
        isActive: true
      },
      {
        title: 'Automatisation WhatsApp & Emailing',
        slug: 'automatisation-whatsapp-emailing',
        description: 'Automatisez votre communication client',
        longDescription: 'Solutions d\'automatisation pour WhatsApp Business et campagnes email. Réponses automatiques, chatbots, et newsletters pour garder le contact avec vos clients.',
        icon: '',
        priceRange: { min: 600, max: 1800 },
        features: [
          'Chatbot WhatsApp Business',
          'Réponses automatiques',
          'Campagnes email',
          'Segmentation clients',
          'Analytics détaillés'
        ],
        order: 5,
        isActive: true
      },
      {
        title: 'Campagnes réseaux sociaux',
        slug: 'campagnes-reseaux-sociaux',
        description: 'Gestion complète de vos réseaux sociaux',
        longDescription: 'Stratégie social media, création de contenu, et gestion de communauté pour Facebook, Instagram, et LinkedIn. Développez votre présence en ligne.',
        icon: '',
        priceRange: { min: 500, max: 1500 },
        features: [
          'Stratégie social media',
          'Création de contenu',
          'Planning éditorial',
          'Gestion communauté',
          'Rapport mensuel'
        ],
        order: 6,
        isActive: true
      },
      {
        title: 'Impression flyers avec QR code',
        slug: 'impression-flyers-qr-code',
        description: 'Flyers modernes avec QR codes interactifs',
        longDescription: 'Design et impression de flyers professionnels avec QR codes personnalisés. Connectez votre communication physique au digital.',
        icon: '🎫',
        priceRange: { min: 300, max: 800 },
        features: [
          'Design professionnel',
          'QR code personnalisé',
          'Impression haute qualité',
          'Plusieurs formats',
          'Livraison incluse'
        ],
        order: 7,
        isActive: true
      },
      {
        title: 'Traduction hébreu / français',
        slug: 'traduction-hebreu-francais',
        description: 'Services de traduction professionnelle',
        longDescription: 'Traduction de qualité pour tous vos documents, sites web, et supports marketing. Par des traducteurs natifs spécialisés dans le contexte israélien.',
        icon: '🌍',
        priceRange: { min: 200, max: 1000 },
        features: [
          'Traducteurs natifs',
          'Relecture incluse',
          'Adaptation culturelle',
          'Délais rapides',
          'Tous types de documents'
        ],
        order: 8,
        isActive: true
      },
      {
        title: 'Site E-commerce complet',
        slug: 'site-ecommerce-complet',
        description: 'Boutique en ligne avec paiement sécurisé',
        longDescription: 'Solution e-commerce complète avec catalogue produits, panier, paiement en ligne sécurisé, gestion des stocks et tableau de bord vendeur. Parfait pour vendre en Israël.',
        icon: '',
        priceRange: { min: 3500, max: 8000 },
        features: [
          'Catalogue produits illimité',
          'Paiement sécurisé (Stripe, PayPal)',
          'Gestion des stocks automatique',
          'Tableau de bord vendeur',
          'Multi-devises (ILS, EUR, USD)',
          'Calcul automatique TVA israélienne',
          'Intégration transporteurs locaux'
        ],
        order: 9,
        isActive: true
      },
      {
        title: 'Marketplace multi-vendeurs',
        slug: 'marketplace-multi-vendeurs',
        description: 'Plateforme de vente pour plusieurs vendeurs',
        longDescription: 'Créez votre propre marketplace comme Amazon ou Etsy. Gestion des vendeurs, commissions automatiques, système de notation et paiements divisés.',
        icon: '',
        priceRange: { min: 8000, max: 15000 },
        features: [
          'Gestion multi-vendeurs',
          'Commissions automatiques',
          'Système de notation',
          'Paiements divisés',
          'Dashboard vendeur',
          'Facturation automatique',
          'Support multi-langue'
        ],
        order: 10,
        isActive: true
      },
      {
        title: 'Système de réservation en ligne',
        slug: 'systeme-reservation-ligne',
        description: 'Réservations et rendez-vous automatisés',
        longDescription: 'Solution complète pour gérer les réservations: calendrier en ligne, rappels automatiques, paiement d\'acompte, gestion des créneaux.',
        icon: '',
        priceRange: { min: 1800, max: 3500 },
        features: [
          'Calendrier de réservation',
          'Rappels SMS/Email automatiques',
          'Paiement d\'acompte en ligne',
          'Gestion multi-employés',
          'Synchronisation Google Calendar',
          'Liste d\'attente automatique'
        ],
        order: 11,
        isActive: true
      }
    ]);
    console.log('Services created');

    // Create packs
    const packs = await Pack.insertMany([
      {
        name: 'Starter',
        slug: 'starter',
        description: 'Site vitrine 1 page + nom de domaine + email pro',
        price: 990,
        features: [
          'Site vitrine 1 page',
          'Design responsive',
          'Nom de domaine .com',
          'Email professionnel',
          'Hébergement 1 an',
          'SSL inclus'
        ],
        highlighted: false,
        order: 1,
        isActive: true
      },
      {
        name: 'Pro',
        slug: 'pro',
        description: 'Site vitrine 3 pages + SEO local + Google Business',
        price: 2490,
        features: [
          'Site vitrine 3 pages',
          'SEO local optimisé',
          'Google My Business',
          '100 flyers avec QR code',
          'Formation utilisation',
          'Support 3 mois'
        ],
        highlighted: true,
        badge: 'MEILLEUR CHOIX',
        order: 2,
        isActive: true
      },
      {
        name: 'E-Commerce',
        slug: 'ecommerce',
        description: 'Boutique en ligne complète avec paiement sécurisé',
        price: 4490,
        features: [
          'Catalogue produits illimité',
          'Paiement sécurisé multi-devises',
          'Gestion stocks automatique',
          'Tableau de bord vendeur',
          'Formation e-commerce complète',
          'Support prioritaire 6 mois'
        ],
        highlighted: false,
        order: 3,
        isActive: true
      },
      {
        name: 'Maintenance',
        slug: 'maintenance',
        description: 'Hébergement + mises à jour + support technique',
        price: 390,
        features: [
          'Hébergement premium',
          'Mises à jour régulières',
          'Sauvegardes automatiques',
          'Support technique',
          'Monitoring 24/7',
          'Certificat SSL'
        ],
        highlighted: false,
        isYearly: true,
        order: 4,
        isActive: true
      }
    ]);
    console.log('Creating packs...');

    // Create sample projects
    const projects = await Project.insertMany([
      {
        title: 'Site Dr. Sarah Cohen - Thérapeute',
        slug: 'site-dr-sarah-cohen',
        client: 'Dr. Sarah Cohen',
        description: 'Site vitrine moderne pour cabinet de thérapie francophone à Tel Aviv. Prise de rendez-vous en ligne intégrée.',
        category: 'Santé',
        technologies: ['Next.js', 'Tailwind CSS', 'Calendly'],
        imageUrl: '/images/projects/therapist-site.jpg',
        link: 'https://example.com',
        featured: true,
        order: 1,
        isActive: true
      },
      {
        title: 'Restaurant Le Parisien - Menu QR',
        slug: 'restaurant-le-parisien',
        client: 'Restaurant Le Parisien',
        description: 'Site web avec menu digital accessible par QR code. Multi-langue français/hébreu, photos haute qualité.',
        category: 'Restaurant',
        technologies: ['React', 'Node.js', 'QR Code'],
        imageUrl: '/images/projects/restaurant-site.jpg',
        link: 'https://example.com',
        featured: true,
        order: 2,
        isActive: true
      },
      {
        title: 'Coach Fitness David - Tunnel de conversion',
        slug: 'coach-fitness-david',
        client: 'David Fitcoach',
        description: 'Landing page avec tunnel de conversion optimisé. Système de réservation et paiement en ligne intégré.',
        category: 'Sport & Fitness',
        technologies: ['WordPress', 'Elementor', 'Stripe'],
        imageUrl: '/images/projects/fitness-coach.jpg',
        link: 'https://example.com',
        featured: true,
        order: 3,
        isActive: true
      },
      {
        title: 'Boutique Mode Française',
        slug: 'boutique-mode-francaise',
        client: 'La Mode Paris',
        description: 'E-commerce complet avec gestion des stocks et livraisons en Israël. Interface bilingue.',
        category: 'E-commerce',
        technologies: ['Shopify', 'Custom Theme', 'Multi-langue'],
        imageUrl: '/images/projects/fashion-store.jpg',
        featured: false,
        order: 4,
        isActive: true
      },
      {
        title: 'Association Francophone Netanya',
        slug: 'association-francophone-netanya',
        client: 'AFN',
        description: 'Portail communautaire avec espace membres, événements et newsletter automatique.',
        category: 'Association',
        technologies: ['WordPress', 'BuddyPress', 'Mailchimp'],
        imageUrl: '/images/projects/association-site.jpg',
        featured: false,
        order: 5,
        isActive: true
      }
    ]);
    console.log('Projects created');

    // Create sample discounts
    const discounts = await Discount.insertMany([
      {
        code: 'LAUNCH2024',
        description: 'Offre de lancement - 15% de réduction',
        type: 'percentage',
        value: 15,
        minAmount: 1000,
        maxUsage: 50,
        usageCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        isActive: true
      },
      {
        code: 'NOUVEAU500',
        description: 'Réduction nouveau client - 500₪',
        type: 'fixed',
        value: 500,
        minAmount: 2000,
        maxUsage: 100,
        usageCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        isActive: true
      },
      {
        code: 'ECOMMERCE20',
        description: '20% sur les sites e-commerce',
        type: 'percentage',
        value: 20,
        minAmount: 3000,
        maxUsage: 30,
        usageCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
        applicableServices: [],
        isActive: true
      },
      {
        code: 'PACK10',
        description: '10% sur tous les packs',
        type: 'percentage',
        value: 10,
        minAmount: 0,
        maxUsage: null,
        usageCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true
      },
      {
        code: 'FIDELE300',
        description: 'Réduction fidélité - 300₪',
        type: 'fixed',
        value: 300,
        minAmount: 1500,
        maxUsage: null,
        usageCount: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
        isActive: false // Inactive by default, activated for specific clients
      }
    ]);
    console.log('Discounts created');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
