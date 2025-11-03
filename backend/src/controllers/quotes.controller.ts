import { Request, Response } from 'express';
import Quote from '../models/Quote.model';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const quote = await Quote.create(req.body);
    
    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const calculateQuote = async (req: Request, res: Response) => {
  try {
    const { projectType, pageCount, options } = req.body;
    
    let basePrice = 0;
    const items = [];
    
    // Base price based on project type
    switch (projectType) {
      case 'vitrine':
        basePrice = 800;
        items.push({ name: 'Site vitrine de base', quantity: 1, price: 800 });
        break;
      case 'ecommerce':
        basePrice = 2500;
        items.push({ name: 'Site e-commerce', quantity: 1, price: 2500 });
        break;
      case 'landing':
        basePrice = 600;
        items.push({ name: 'Landing page', quantity: 1, price: 600 });
        break;
      default:
        basePrice = 800;
    }
    
    // Price per additional page
    if (pageCount > 1) {
      const additionalPages = pageCount - 1;
      const pricePerPage = 300;
      basePrice += additionalPages * pricePerPage;
      items.push({ 
        name: 'Pages supplémentaires', 
        quantity: additionalPages, 
        price: pricePerPage 
      });
    }
    
    // Options prices
    if (options) {
      if (options.includes('logo')) {
        basePrice += 500;
        items.push({ name: 'Création de logo', quantity: 1, price: 500 });
      }
      if (options.includes('seo')) {
        basePrice += 800;
        items.push({ name: 'Référencement SEO', quantity: 1, price: 800 });
      }
      if (options.includes('social')) {
        basePrice += 600;
        items.push({ name: 'Réseaux sociaux', quantity: 1, price: 600 });
      }
      if (options.includes('automation')) {
        basePrice += 1200;
        items.push({ name: 'Automatisation', quantity: 1, price: 1200 });
      }
      if (options.includes('translation')) {
        basePrice += 400;
        items.push({ name: 'Traduction', quantity: 1, price: 400 });
      }
    }
    
    res.json({
      success: true,
      data: {
        items,
        totalPrice: basePrice,
        currency: '₪'
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllQuotes = async (req: Request, res: Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: quotes
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getQuoteById = async (req: Request, res: Response) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Devis non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateQuoteStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Devis non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
