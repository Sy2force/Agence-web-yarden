import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getBySlug: (slug: string) => api.get(`/services/${slug}`),
};

// Packs API
export const packsAPI = {
  getAll: () => api.get('/packs'),
  getBySlug: (slug: string) => api.get(`/packs/${slug}`),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getBySlug: (slug: string) => api.get(`/projects/${slug}`),
};

// Contact API
export const contactAPI = {
  create: (data: {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
  }) => api.post('/contact', data),
};

// Quotes API
export const quotesAPI = {
  calculate: (data: {
    projectType: string;
    pageCount: number;
    options?: string[];
  }) => api.post('/quotes/calculate', data),
  create: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    projectType: string;
    pageCount: number;
    items: Array<{ name: string; quantity: number; price: number }>;
    totalPrice: number;
  }) => api.post('/quotes', data),
};

// Auth API
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
};

export default api;
