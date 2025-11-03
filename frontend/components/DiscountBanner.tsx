'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface Discount {
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
}

export default function DiscountBanner() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const fetchActiveDiscounts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discounts/active`);
      setDiscounts(response.data.data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  };

  useEffect(() => {
    fetchActiveDiscounts();
  }, []);

  useEffect(() => {
    if (discounts.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % discounts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [discounts]);

  if (!isVisible || discounts.length === 0) return null;

  const currentDiscount = discounts[currentIndex];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-sm md:text-base font-medium text-center">
          <span className="font-bold mr-2">OFFRE LIMITÉE:</span>
          {currentDiscount.description} - Code: <span className="font-mono bg-white/20 px-2 py-1 rounded">{currentDiscount.code}</span>
          {currentDiscount.minAmount && (
            <span className="ml-2 text-xs opacity-90">
              (Dès {currentDiscount.minAmount}₪)
            </span>
          )}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
