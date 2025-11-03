'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { quotesAPI } from '@/lib/api';
import axios from 'axios';
import { formatPrice } from '@/lib/utils';
import { Calculator, Check, Plus, Minus } from 'lucide-react';

export default function SimulateurPage() {
  const [projectType, setProjectType] = useState('vitrine');
  const [pageCount, setPageCount] = useState(1);
  const [options, setOptions] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState<{
    originalAmount: number;
    discountedAmount: number;
    savedAmount: number;
    discountType: string;
    discountValue: number;
  } | null>(null);
  const [quote, setQuote] = useState<{
    items: Array<{ name: string; quantity: number; price: number }>;
    totalPrice: number;
    originalPrice?: number;
    currency: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    { value: 'vitrine', label: 'Site Vitrine', basePages: 1 },
    { value: 'ecommerce', label: 'Site E-commerce', basePages: 5 },
    { value: 'landing', label: 'Landing Page', basePages: 1 },
  ];

  const availableOptions = [
    { value: 'logo', label: 'Création de logo', price: 500 },
    { value: 'seo', label: 'Référencement SEO', price: 800 },
    { value: 'social', label: 'Réseaux sociaux', price: 600 },
    { value: 'automation', label: 'Automatisation', price: 1200 },
    { value: 'translation', label: 'Traduction HE/FR', price: 400 },
  ];

  const handleOptionToggle = (option: string) => {
    setOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const calculateQuote = async () => {
    setLoading(true);
    try {
      const response = await quotesAPI.calculate({
        projectType,
        pageCount,
        options,
      });
      const quoteData = response.data.data;
      
      // Apply discount if code is provided
      if (discountCode) {
        try {
          const discountResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/discounts/validate`,
            {
              code: discountCode,
              amount: quoteData.totalPrice
            }
          );
          setDiscountApplied(discountResponse.data.data);
          quoteData.originalPrice = quoteData.totalPrice;
          quoteData.totalPrice = discountResponse.data.data.discountedAmount;
        } catch {
          console.error('Code promo invalide');
          setDiscountApplied(null);
        }
      }
      
      setQuote(quoteData);
    } catch (error) {
      console.error('Error calculating quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendQuoteRequest = () => {
    const selectedOptions = availableOptions
      .filter(opt => options.includes(opt.value))
      .map(opt => opt.label)
      .join(', ');
    
    const message = `Type de projet: ${projectType}, Pages: ${pageCount}, Options: ${selectedOptions || 'Aucune'}`;
    window.location.href = `/contact?message=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simulateur de Devis
          </h1>
          <p className="text-xl text-gray-600">
            Estimez le coût de votre projet en quelques clics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Project Type */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Type de projet
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setProjectType(type.value);
                    setPageCount(type.basePages);
                  }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    projectType === type.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Page Count */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Nombre de pages
            </label>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                disabled={pageCount <= 1}
                aria-label="Diminuer le nombre de pages"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-2xl font-bold w-16 text-center">{pageCount}</span>
              <button
                onClick={() => setPageCount(pageCount + 1)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Augmenter le nombre de pages"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Code Promo */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Code promo (optionnel)
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              placeholder="Entrez votre code promo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
            />
          </div>

          {/* Options */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Options supplémentaires
            </label>
            <div className="space-y-3">
              {availableOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.includes(option.value)}
                      onChange={() => handleOptionToggle(option.value)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 font-medium">{option.label}</span>
                  </div>
                  <span className="text-gray-500">+{formatPrice(option.price)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateQuote}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Calculer mon devis
              </>
            )}
          </button>
        </motion.div>

        {/* Quote Result */}
        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Estimation de votre projet
            </h2>
            
            <div className="space-y-3 mb-6">
              {quote.items.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-700">
                    {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-900 pt-4">
              {discountApplied && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Prix original</span>
                    <span className="text-xl line-through text-gray-500">
                      {formatPrice(quote.originalPrice || quote.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 font-semibold">Réduction appliquée</span>
                    <span className="text-xl text-green-600 font-semibold">
                      -{formatPrice(discountApplied.savedAmount)}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total estimé</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(quote.totalPrice)}
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={calculateQuote}
                className="py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Recalculer
              </button>
              <button
                onClick={sendQuoteRequest}
                className="py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Check className="mr-2 h-5 w-5" />
                Demander ce devis
              </button>
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-blue-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            💡 Bon à savoir
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Les prix affichés sont en shekel israélien (₪)</li>
            <li>• Cette estimation est indicative et peut varier selon vos besoins spécifiques</li>
            <li>• Un devis détaillé vous sera envoyé après analyse de votre projet</li>
            <li>• Paiement possible en plusieurs fois sans frais</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
