import api from './api';

export interface IDiscount {
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxUsage?: number;
  usageCount?: number;
  validFrom?: Date;
  validUntil?: Date;
  isActive?: boolean;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const discountsAPI = {
  // Get all active discounts
  getActive: () => api.get('/discounts/active'),
  
  // Validate a discount code
  validate: (data: { code: string; amount: number; serviceId?: string; packId?: string }) => 
    api.post('/discounts/validate', data),
  
  // Apply a discount
  apply: (code: string) => api.post('/discounts/apply', { code }),
  
  // Admin functions
  getAll: () => api.get('/discounts'),
  create: (data: IDiscount) => api.post('/discounts', data),
  update: (id: string, data: Partial<IDiscount>) => api.put(`/discounts/${id}`, data),
  delete: (id: string) => api.delete(`/discounts/${id}`)
};
