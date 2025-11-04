import { IPack } from '../../shared/types';
import { Check, Star } from 'lucide-react';

interface PackCardProps {
  pack: IPack;
  onSelect: () => void;
}

export default function PackCard({ pack, onSelect }: PackCardProps) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
      pack.highlighted 
        ? 'ring-4 ring-blue-500 ring-opacity-50 bg-gradient-to-br from-blue-50 to-white' 
        : 'hover:shadow-2xl'
    }`}>
      {pack.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <Star className="w-4 h-4" />
            {pack.badge}
          </div>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{pack.name}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{pack.description}</p>
        
        <div className="mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-blue-600">
              {pack.price.toLocaleString()}
            </span>
            <span className="text-xl text-blue-600 font-semibold">₪</span>
          </div>
          {pack.isYearly && (
            <span className="text-sm text-gray-500 block mt-1">par an</span>
          )}
        </div>
        
        <ul className="space-y-3 mb-8 text-left">
          {pack.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={onSelect}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            pack.highlighted
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
          }`}
        >
          {pack.highlighted ? '🚀 Commencer maintenant' : 'Choisir ce pack'}
        </button>
        
        {pack.highlighted && (
          <p className="text-xs text-gray-500 mt-3">
            ⭐ Le plus populaire
          </p>
        )}
      </div>
    </div>
  );
}
