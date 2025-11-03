import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = '₪'): string {
  return `${price.toLocaleString('he-IL')} ${currency}`;
}

export function formatPriceRange(min: number, max: number, currency: string = '₪'): string {
  return `${min.toLocaleString('he-IL')} - ${max.toLocaleString('he-IL')} ${currency}`;
}
