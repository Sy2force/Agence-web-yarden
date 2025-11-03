// Shared types between frontend and backend

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  priceRange: {
    min: number;
    max: number;
  };
  features: string[];
  image?: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPack {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string[];
  highlighted: boolean;
  badge?: string;
  isYearly?: boolean;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
  featured: boolean;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status?: 'new' | 'contacted' | 'completed';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuoteItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IQuote {
  _id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectType: string;
  pageCount: number;
  items: IQuoteItem[];
  totalPrice: number;
  status?: 'draft' | 'sent' | 'accepted' | 'rejected';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}
