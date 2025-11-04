import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IService } from '../../shared/types';
import { ArrowRight, Check, Clock, Star, ShoppingCart } from 'lucide-react';

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');

  const handleOrder = () => {
    setIsOrdering(true);
    setOrderStatus('pending');
    
    // Créer une nouvelle commande
    const newOrder = {
      id: Date.now().toString(),
      serviceName: service.title,
      clientName: 'Client Demo',
      clientEmail: 'client@example.com',
      clientPhone: '+972 50 123 4567',
      price: service.priceRange.min,
      status: 'pending' as const,
      createdAt: new Date(),
    };

    // Sauvegarder dans localStorage
    const existingOrders = JSON.parse(localStorage.getItem('webYardenOrders') || '[]');
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('webYardenOrders', JSON.stringify(updatedOrders));

    // Déclencher l'événement storage pour notifier OrderManager
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'webYardenOrders',
      newValue: JSON.stringify(updatedOrders),
    }));
    
    // Simulation de commande
    setTimeout(() => {
      setOrderStatus('confirmed');
      setIsOrdering(false);
    }, 2000);
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-gray-100">
      {/* Image de service */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={service.image || '/images/services/vitrine.svg'} 
          alt={service.title}
          width={400}
          height={192}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500"></div>
        
        {/* Status badge */}
        {orderStatus === 'pending' && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium flex items-center gap-1 shadow-lg">
            <Clock className="w-3 h-3 animate-pulse" />
            En attente
          </div>
        )}
        {orderStatus === 'confirmed' && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1 shadow-lg">
            <Check className="w-3 h-3" />
            Confirmé
          </div>
        )}
        
        {/* Badge premium pour certains services */}
        {service.order <= 2 && (
          <div className="absolute top-4 left-4 px-2 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Populaire
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>
        
        {/* Prix */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <p className="text-sm font-medium text-gray-600 mb-1">À partir de</p>
          <p className="text-3xl font-bold text-blue-600">
            {service.priceRange.min.toLocaleString()} ₪
          </p>
          <p className="text-sm text-gray-500">
            jusqu&apos;à {service.priceRange.max.toLocaleString()} ₪
          </p>
        </div>
        
        {/* Features */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Inclus</h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleOrder}
            disabled={isOrdering || orderStatus === 'confirmed'}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              orderStatus === 'confirmed'
                ? 'bg-green-500 text-white cursor-not-allowed shadow-lg'
                : orderStatus === 'pending'
                ? 'bg-yellow-500 text-white cursor-wait shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {orderStatus === 'confirmed' ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Commandé
              </div>
            ) : orderStatus === 'pending' ? (
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 animate-spin" />
                En cours...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Commander
              </div>
            )}
          </button>
          
          <Link
            href={`/services/${service.slug}`}
            className="px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center justify-center group/btn"
            title="En savoir plus sur ce service"
          >
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000 ease-out"></div>
      </div>
    </div>
  );
}
