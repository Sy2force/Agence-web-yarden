import Link from 'next/link';
import { formatPriceRange } from '@/lib/utils';
import { IService } from '../../shared/types';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: IService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{service.icon}</span>
        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Prix estimé:</p>
        <p className="text-lg font-bold text-blue-600">
          {formatPriceRange(service.priceRange.min, service.priceRange.max)}
        </p>
      </div>
      
      <ul className="mb-6 space-y-1">
        {service.features.slice(0, 3).map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm"
      >
        En savoir plus
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
