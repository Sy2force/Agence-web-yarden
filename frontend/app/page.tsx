'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, TrendingUp, Users } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { IService } from '../../shared/types';

// Services de démonstration
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
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Stratégie complète de marketing digital pour développer votre visibilité',
    longDescription: 'Mise en place d\'une stratégie marketing digital complète incluant réseaux sociaux, publicité en ligne et email marketing.',
    icon: 'trending-up',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    priceRange: { min: 800, max: 2000 },
    features: ['Réseaux sociaux', 'Google Ads', 'Email marketing', 'Analytics'],
    isActive: true,
    order: 3
  }
];

export default function Home() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utiliser les services de démonstration
    setServices(demoServices);
    setLoading(false);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenue chez <span className="text-blue-600">Web Yarden</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              L&apos;agence digitale des francophones en Israël
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Création de sites, marketing digital, automatisations...
              Tout ce qu&apos;il vous faut pour développer votre activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Voir nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/packs"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Choisir un pack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sites Web Modernes</h3>
              <p className="text-gray-600">Création de sites responsifs et optimisés</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Marketing Digital</h3>
              <p className="text-gray-600">Stratégies pour booster votre visibilité</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mobile First</h3>
              <p className="text-gray-600">Sites parfaitement adaptés aux mobiles</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Support Local</h3>
              <p className="text-gray-600">Équipe francophone basée en Israël</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600">Des solutions adaptées à vos besoins</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Voir tous nos services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à développer votre activité ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-nous pour discuter de votre projet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/simulateur"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Simuler mon projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
