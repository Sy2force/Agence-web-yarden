'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { packsAPI } from '@/lib/api';
import PackCard from '@/components/PackCard';
import { IPack } from '../../../shared/types';
import { useRouter } from 'next/navigation';

export default function PacksPage() {
  const [packs, setPacks] = useState<IPack[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await packsAPI.getAll();
        setPacks(response.data.data);
      } catch (error) {
        console.error('Error fetching packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  const handleSelectPack = (packName: string) => {
    router.push(`/contact?pack=${encodeURIComponent(packName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Packs Clés en Main
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes à prix fixe en shekel. 
            Choisissez le pack qui correspond à vos besoins et votre budget.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {packs.map((pack, index) => (
                <motion.div
                  key={pack._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PackCard 
                    pack={pack}
                    onSelect={() => handleSelectPack(pack.name)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pricing Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Comparatif des Packs
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-6 py-3 text-left">Pack</th>
                      <th className="px-6 py-3 text-center">Prix</th>
                      <th className="px-6 py-3 text-center">Pages</th>
                      <th className="px-6 py-3 text-center">Design</th>
                      <th className="px-6 py-3 text-center">SEO</th>
                      <th className="px-6 py-3 text-center">Support</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-semibold">Starter</td>
                      <td className="px-6 py-4 text-center">1290 ₪</td>
                      <td className="px-6 py-4 text-center">1 page</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">Basique</td>
                      <td className="px-6 py-4 text-center">1 mois</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 font-semibold">Pro</td>
                      <td className="px-6 py-4 text-center">2790 ₪</td>
                      <td className="px-6 py-4 text-center">3 pages</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">Local</td>
                      <td className="px-6 py-4 text-center">3 mois</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold">Premium</td>
                      <td className="px-6 py-4 text-center">4990 ₪</td>
                      <td className="px-6 py-4 text-center">5 pages</td>
                      <td className="px-6 py-4 text-center">✓ + Logo</td>
                      <td className="px-6 py-4 text-center">Complet</td>
                      <td className="px-6 py-4 text-center">6 mois</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold">Maintenance</td>
                      <td className="px-6 py-4 text-center">490 ₪/an</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">Mises à jour</td>
                      <td className="px-6 py-4 text-center">Monitoring</td>
                      <td className="px-6 py-4 text-center">12 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-100 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Vous hésitez encore ?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Utilisez notre simulateur pour estimer le coût de votre projet personnalisé.
          </p>
          <a
            href="/simulateur"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Simuler mon projet
          </a>
        </motion.div>
      </div>
    </div>
  );
}
