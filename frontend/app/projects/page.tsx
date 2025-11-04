'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { IProject } from '../../../shared/types';

// Données de démonstration
const demoProjects: IProject[] = [
  {
    _id: '1',
    title: 'Site Dr. Sarah Cohen - Thérapeute',
    slug: 'site-dr-sarah-cohen-therapeute',
    client: 'Dr. Sarah Cohen',
    description: 'Site vitrine moderne pour cabinet de thérapie francophone à Tel Aviv. Prise de rendez-vous en ligne intégrée.',
    category: 'Santé',
    technologies: ['Next.js', 'Tailwind CSS', 'Calendly'],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center',
    link: 'https://dr-sarah-cohen.co.il',
    featured: true,
    order: 1,
    isActive: true
  },
  {
    _id: '2',
    title: 'Restaurant Le Parisien - Menu QR',
    slug: 'restaurant-le-parisien-menu-qr',
    client: 'Restaurant Le Parisien',
    description: 'Site web avec menu digital accessible par QR code. Multi-langue français/hébreu, photos haute qualité.',
    category: 'Restaurant',
    technologies: ['React', 'Node.js', 'QR Code'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center',
    link: 'https://restaurant-parisien.co.il',
    featured: true,
    order: 2,
    isActive: true
  },
  {
    _id: '3',
    title: 'Coach Fitness David - Tunnel de conversion',
    slug: 'coach-fitness-david-tunnel-conversion',
    client: 'David Fitcoach',
    description: 'Landing page avec tunnel de conversion optimisé. Système de réservation et paiement en ligne intégré.',
    category: 'Sport & Fitness',
    technologies: ['WordPress', 'Elementor', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    link: 'https://david-fitcoach.co.il',
    featured: true,
    order: 3,
    isActive: true
  },
  {
    _id: '4',
    title: 'École Française de Tel Aviv',
    slug: 'ecole-francaise-tel-aviv',
    client: 'École Française',
    description: 'Site institutionnel avec espace parents et système d\'inscription',
    category: 'Éducation',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    imageUrl: '/images/project-school.svg',
    featured: true,
    order: 4,
    isActive: true
  },
  {
    _id: '5',
    title: 'Agence Immobilière TLV',
    slug: 'agence-immobiliere-tlv',
    client: 'Immo TLV',
    description: 'Plateforme immobilière avec recherche avancée et visite virtuelle',
    category: 'Immobilier',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    imageUrl: '/images/project-realestate.svg',
    featured: false,
    order: 5,
    isActive: true
  },
  {
    _id: '6',
    title: 'Startup Tech Jerusalem',
    slug: 'startup-tech-jerusalem',
    client: 'TechStart JLM',
    description: 'Landing page moderne pour startup tech avec animations avancées',
    category: 'Tech',
    technologies: ['Gatsby', 'GraphQL', 'Framer Motion'],
    imageUrl: '/images/project-startup.svg',
    link: 'https://techstart-jlm.com',
    featured: false,
    order: 6,
    isActive: true
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulation du chargement
    setTimeout(() => {
      setProjects(demoProjects);
      setLoading(false);
    }, 500);
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Réalisations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les projets que nous avons réalisés pour nos clients francophones en Israël.
            Chaque projet est unique et adapté aux besoins spécifiques de nos clients.
          </p>
        </motion.div>

        {/* Category Filter */}
        {!loading && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun projet dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Votre projet sera le prochain ?
          </h2>
          <p className="text-lg mb-6">
            Contactez-nous pour discuter de votre projet et rejoindre nos clients satisfaits.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Démarrer mon projet
          </a>
        </motion.div>
      </div>
    </div>
  );
}
