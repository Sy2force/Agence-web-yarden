'use client';

import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { IService } from '../../../shared/types';

// Données de démonstration
const demoServices: IService[] = [
  {
    _id: '1',
    title: 'Site Web Vitrine',
    slug: 'site-web-vitrine',
    description: 'Site web professionnel responsive avec design moderne et optimisé SEO',
    longDescription: 'Création d\'un site web professionnel entièrement responsive, optimisé pour les moteurs de recherche et adapté aux besoins des entreprises en Israël.',
    icon: 'globe',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 1200, max: 2000 },
    features: ['Design responsive', 'Optimisation SEO', 'Formulaire de contact', 'Google Analytics'],
    isActive: true,
    order: 1
  },
  {
    _id: '2',
    title: 'E-commerce',
    slug: 'e-commerce',
    description: 'Boutique en ligne complète avec paiement sécurisé et gestion des stocks',
    longDescription: 'Développement d\'une boutique en ligne complète avec système de paiement sécurisé, gestion des stocks et interface d\'administration.',
    icon: 'shopping-cart',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 3000, max: 5000 },
    features: ['Catalogue produits', 'Panier d\'achat', 'Paiement sécurisé', 'Gestion commandes'],
    isActive: true,
    order: 2
  },
  {
    _id: '3',
    title: 'Référencement Local',
    slug: 'referencement-local',
    description: 'Optimisation SEO pour être visible sur Google Maps et recherches locales',
    longDescription: 'Optimisation complète de votre présence locale sur Google pour attirer plus de clients dans votre zone géographique.',
    icon: 'map-pin',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 600, max: 1200 },
    features: ['Google My Business', 'Citations locales', 'Avis clients', 'Mots-clés locaux'],
    isActive: true,
    order: 3
  },
  {
    _id: '4',
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Stratégie complète de marketing digital pour développer votre visibilité',
    longDescription: 'Mise en place d\'une stratégie marketing digital complète incluant réseaux sociaux, publicité en ligne et email marketing.',
    icon: 'trending-up',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 800, max: 2000 },
    features: ['Réseaux sociaux', 'Google Ads', 'Email marketing', 'Analytics'],
    isActive: true,
    order: 4
  },
  {
    _id: '5',
    title: 'Maintenance Web',
    slug: 'maintenance-web',
    description: 'Maintenance et mise à jour régulière de votre site web',
    longDescription: 'Service de maintenance mensuelle pour assurer la sécurité, les performances et la mise à jour de votre site web.',
    icon: 'settings',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 100, max: 300 },
    features: ['Mises à jour', 'Sauvegardes', 'Sécurité', 'Support technique'],
    isActive: true,
    order: 5
  },
  {
    _id: '6',
    title: 'Automatisation',
    slug: 'automatisation',
    description: 'Automatisation de vos processus métier pour gagner du temps',
    longDescription: 'Mise en place d\'automatisations pour optimiser vos processus métier et améliorer votre productivité.',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 1500, max: 3000 },
    features: ['Workflows', 'Intégrations', 'CRM', 'Notifications'],
    isActive: true,
    order: 6
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Nos Services à la Carte
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions digitales adaptées à vos besoins et votre budget. Chaque service 
            est personnalisable selon vos objectifs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-none">
          {demoServices.map((service) => (
            <div key={service._id} className="flex">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Besoin d&apos;une solution sur mesure ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé adapté à vos besoins spécifiques.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Demander un devis
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
