import Joi from 'joi';

// Contact validation schema
export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom ne peut pas dépasser 100 caractères',
    'any.required': 'Le nom est obligatoire'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'L\'email est obligatoire'
  }),
  phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]+$/).min(9).max(20).messages({
    'string.pattern.base': 'Numéro de téléphone invalide',
    'string.min': 'Le numéro doit contenir au moins 9 chiffres'
  }),
  company: Joi.string().max(100).allow(''),
  subject: Joi.string().required().messages({
    'any.required': 'Le sujet est obligatoire'
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    'string.min': 'Le message doit contenir au moins 10 caractères',
    'string.max': 'Le message ne peut pas dépasser 2000 caractères',
    'any.required': 'Le message est obligatoire'
  }),
  budget: Joi.string().valid('small', 'medium', 'large', 'custom').allow(''),
  timeline: Joi.string().allow('')
});

// Quote validation schema
export const quoteSchema = Joi.object({
  projectType: Joi.string().valid('vitrine', 'ecommerce', 'landing', 'custom').required().messages({
    'any.required': 'Le type de projet est obligatoire'
  }),
  pageCount: Joi.number().min(1).max(100).required().messages({
    'number.min': 'Au moins 1 page est requise',
    'number.max': 'Maximum 100 pages',
    'any.required': 'Le nombre de pages est obligatoire'
  }),
  options: Joi.array().items(Joi.string()).default([]),
  discountCode: Joi.string().uppercase().allow('')
});

// Service validation schema
export const serviceSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  shortDescription: Joi.string().max(200),
  price: Joi.number().min(0).required(),
  priceRange: Joi.object({
    min: Joi.number().min(0).required(),
    max: Joi.number().min(Joi.ref('min')).required()
  }),
  features: Joi.array().items(Joi.string()),
  icon: Joi.string(),
  category: Joi.string().valid('web', 'marketing', 'design', 'consulting'),
  isActive: Joi.boolean().default(true),
  order: Joi.number().min(0)
});

// Pack validation schema
export const packSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  slug: Joi.string().lowercase().required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().min(0).required(),
  features: Joi.array().items(Joi.string()).min(1).required(),
  highlighted: Joi.boolean().default(false),
  badge: Joi.string().max(30),
  order: Joi.number().min(0),
  isYearly: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true)
});

// Project validation schema
export const projectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  imageUrl: Joi.string().uri().required(),
  projectUrl: Joi.string().uri(),
  clientName: Joi.string().max(100),
  category: Joi.string().valid('E-commerce', 'Site vitrine', 'Blog', 'Portfolio', 'Application', 'Association').required(),
  technologies: Joi.array().items(Joi.string()),
  testimonial: Joi.string().max(500),
  featured: Joi.boolean().default(false),
  order: Joi.number().min(0),
  isActive: Joi.boolean().default(true)
});

// Auth validation schemas
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'L\'email est obligatoire'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    'any.required': 'Le mot de passe est obligatoire'
  })
});

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
    'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
  }),
  role: Joi.string().valid('user', 'admin').default('user')
});

// Validation middleware factory
export const validate = (schema: Joi.Schema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        errors
      });
    }
    next();
  };
};
