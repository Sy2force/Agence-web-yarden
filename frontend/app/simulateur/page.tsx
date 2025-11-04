'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check, Zap, Star } from 'lucide-react';

interface QuoteItem {
  name: string;
  price: number;
  selected: boolean;
  description?: string;
  popular?: boolean;
}

const services: QuoteItem[] = [
  { 
    name: 'Site vitrine (1-3 pages)', 
    price: 1500, 
    selected: false,
    description: 'Site professionnel avec design moderne',
    popular: false
  },
  { 
    name: 'Site vitrine (4-6 pages)', 
    price: 2500, 
    selected: false,
    description: 'Site complet avec plusieurs sections',
    popular: true
  },
  { 
    name: 'Site e-commerce', 
    price: 4000, 
    selected: false,
    description: 'Boutique en ligne avec paiement sécurisé',
    popular: false
  },
  { 
    name: 'Référencement SEO', 
    price: 800, 
    selected: false,
    description: 'Optimisation pour Google et moteurs de recherche',
    popular: true
  },
  { 
    name: 'Marketing digital', 
    price: 1200, 
    selected: false,
    description: 'Stratégie complète réseaux sociaux et publicité',
    popular: false
  },
  { 
    name: 'Logo professionnel', 
    price: 400, 
    selected: false,
    description: 'Création d\'identité visuelle unique',
    popular: false
  },
];

const addons: QuoteItem[] = [
  { 
    name: 'Formulaire de contact avancé', 
    price: 200, 
    selected: false,
    description: 'Formulaire personnalisé avec validation'
  },
  { 
    name: 'Système de réservation', 
    price: 600, 
    selected: false,
    description: 'Prise de rendez-vous en ligne automatisée'
  },
  { 
    name: 'Multilingue (hébreu/français)', 
    price: 500, 
    selected: false,
    description: 'Site disponible en plusieurs langues'
  },
  { 
    name: 'Optimisation mobile avancée', 
    price: 300, 
    selected: false,
    description: 'Performance optimale sur mobile'
  },
  { 
    name: 'Intégration réseaux sociaux', 
    price: 250, 
    selected: false,
    description: 'Connexion avec vos comptes sociaux'
  },
  { 
    name: 'Maintenance 1 an', 
    price: 1200, 
    selected: false,
    description: 'Support technique et mises à jour'
  },
];

export default function SimulateurPage() {
  const [selectedServices, setSelectedServices] = useState<QuoteItem[]>(services);
  const [selectedAddons, setSelectedAddons] = useState<QuoteItem[]>(addons);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const toggleService = (index: number) => {
    const updated = [...selectedServices];
    updated[index].selected = !updated[index].selected;
    setSelectedServices(updated);
  };

  const toggleAddon = (index: number) => {
    const updated = [...selectedAddons];
    updated[index].selected = !updated[index].selected;
    setSelectedAddons(updated);
  };

  const selectedItems = [
    ...selectedServices.filter(s => s.selected),
    ...selectedAddons.filter(a => a.selected)
  ];

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal > 3000 ? Math.floor(subtotal * 0.1) : 0;
  const totalPrice = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      alert('✅ Devis envoyé avec succès ! Nous vous contacterons sous 24h.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calculator className="w-16 h-16 text-blue-600" />
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur de Devis Intelligent
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtenez une estimation précise et instantanée pour votre projet digital.
            Sélectionnez vos services et recevez votre devis personnalisé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-blue-600" />
                Services principaux
              </h2>
              <div className="grid gap-4">
                {selectedServices.map((service, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                      service.selected
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                    onClick={() => toggleService(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center transition-all ${
                          service.selected ? 'border-blue-500 bg-blue-500 scale-110' : 'border-gray-300'
                        }`}>
                          {service.selected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{service.name}</span>
                            {service.popular && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                Populaire
                              </span>
                            )}
                          </div>
                          {service.description && (
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600 text-lg">{service.price.toLocaleString()} ₪</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Options supplémentaires
              </h2>
              <div className="grid gap-4">
                {selectedAddons.map((addon, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                      addon.selected
                        ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                    }`}
                    onClick={() => toggleAddon(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center transition-all ${
                          addon.selected ? 'border-yellow-500 bg-yellow-500 scale-110' : 'border-gray-300'
                        }`}>
                          {addon.selected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-gray-900">{addon.name}</span>
                          {addon.description && (
                            <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-yellow-600 text-lg">{addon.price.toLocaleString()} ₪</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                📋 Résumé du devis
              </h3>
              
              {selectedItems.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {selectedItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 flex-1">{item.name}</span>
                      <span className="font-bold text-blue-600 ml-2">{item.price.toLocaleString()} ₪</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Sélectionnez des services pour voir votre devis</p>
                </div>
              )}

              {selectedItems.length > 0 && (
                <>
                  <div className="border-t pt-4 mb-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">{subtotal.toLocaleString()} ₪</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Remise (-10%)</span>
                        <span className="font-medium">-{discount.toLocaleString()} ₪</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {totalPrice.toLocaleString()} ₪
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                        placeholder="+972 50 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (optionnel)
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        rows={3}
                        value={clientInfo.message}
                        onChange={(e) => setClientInfo({...clientInfo, message: e.target.value})}
                        placeholder="Détails supplémentaires sur votre projet..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                    >
                      🚀 Recevoir mon devis détaillé
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </form>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 text-center font-medium">
                      ✅ Devis gratuit et sans engagement<br/>
                      📧 Réponse personnalisée sous 24h<br/>
                      🎯 Conseils d&apos;experts inclus
                    </p>
                  </div>

                  {discount > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 text-center font-medium">
                        🎉 Remise de 10% appliquée automatiquement !
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
