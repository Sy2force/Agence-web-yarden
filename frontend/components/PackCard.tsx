import { formatPrice, cn } from '@/lib/utils';
import { IPack } from '../../shared/types';
import { Check } from 'lucide-react';

interface PackCardProps {
  pack: IPack;
  onSelect?: () => void;
}

export default function PackCard({ pack, onSelect }: PackCardProps) {
  return (
    <div className={cn(
      "relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6",
      pack.highlighted && "ring-2 ring-blue-600"
    )}>
      {pack.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {pack.badge}
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pack.name}</h3>
        <p className="text-gray-600">{pack.description}</p>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-blue-600">
          {formatPrice(pack.price)}
        </p>
        {pack.isYearly && (
          <p className="text-sm text-gray-500 mt-1">par an</p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {pack.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className={cn(
          "w-full py-3 px-4 rounded-lg font-semibold transition-colors",
          pack.highlighted
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        )}
      >
        Choisir ce pack
      </button>
    </div>
  );
}
