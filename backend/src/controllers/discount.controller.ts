import { Request, Response } from 'express';
import Discount from '../models/Discount.model';
import Joi from 'joi';

// Validation schema
const discountSchema = Joi.object({
  code: Joi.string().uppercase().required(),
  description: Joi.string().required(),
  type: Joi.string().valid('percentage', 'fixed').required(),
  value: Joi.number().min(0).required(),
  minAmount: Joi.number().min(0),
  maxUsage: Joi.number().min(1),
  validFrom: Joi.date().required(),
  validUntil: Joi.date().min(Joi.ref('validFrom')).required(),
  applicableServices: Joi.array().items(Joi.string()),
  applicablePacks: Joi.array().items(Joi.string()),
  isActive: Joi.boolean()
});

// Get all discounts (admin only)
export const getDiscounts = async (req: Request, res: Response) => {
  try {
    const discounts = await Discount.find()
      .populate('applicableServices', 'title')
      .populate('applicablePacks', 'name')
      .sort('-createdAt');
    
    res.json({
      success: true,
      data: discounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching discounts'
    });
  }
};

// Get active discounts
export const getActiveDiscounts = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const discounts = await Discount.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    }).select('code description type value minAmount');
    
    res.json({
      success: true,
      data: discounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching active discounts'
    });
  }
};

// Validate discount code
export const validateDiscount = async (req: Request, res: Response) => {
  try {
    const { code, amount, serviceId, packId } = req.body;
    
    const discount = await Discount.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });
    
    if (!discount) {
      return res.status(404).json({
        success: false,
        error: 'Code promo invalide'
      });
    }
    
    // Check if discount is valid
    const now = new Date();
    const isValid = discount.isActive && 
                    now >= discount.validFrom && 
                    now <= discount.validUntil &&
                    (!discount.maxUsage || discount.usageCount < discount.maxUsage);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Code promo expiré ou limite d\'utilisation atteinte'
      });
    }
    
    // Check minimum amount
    if (discount.minAmount && amount < discount.minAmount) {
      return res.status(400).json({
        success: false,
        error: `Montant minimum requis: ${discount.minAmount}₪`
      });
    }
    
    // Check applicable services
    if (serviceId && discount.applicableServices && discount.applicableServices.length > 0) {
      if (!discount.applicableServices.includes(serviceId)) {
        return res.status(400).json({
          success: false,
          error: 'Code promo non valable pour ce service'
        });
      }
    }
    
    // Check applicable packs
    if (packId && discount.applicablePacks && discount.applicablePacks.length > 0) {
      if (!discount.applicablePacks.includes(packId)) {
        return res.status(400).json({
          success: false,
          error: 'Code promo non valable pour ce pack'
        });
      }
    }
    
    // Calculate discounted amount
    let discountedAmount = amount;
    if (discount.type === 'percentage') {
      discountedAmount = amount * (1 - discount.value / 100);
    } else {
      discountedAmount = Math.max(0, amount - discount.value);
    }
    const savedAmount = amount - discountedAmount;
    
    res.json({
      success: true,
      data: {
        originalAmount: amount,
        discountedAmount,
        savedAmount,
        discountType: discount.type,
        discountValue: discount.value
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error validating discount'
    });
  }
};

// Create new discount (admin only)
export const createDiscount = async (req: Request, res: Response) => {
  try {
    const { error } = discountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    
    const discount = await Discount.create(req.body);
    
    res.status(201).json({
      success: true,
      data: discount
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ce code promo existe déjà'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error creating discount'
    });
  }
};

// Update discount (admin only)
export const updateDiscount = async (req: Request, res: Response) => {
  try {
    const discount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!discount) {
      return res.status(404).json({
        success: false,
        error: 'Discount not found'
      });
    }
    
    res.json({
      success: true,
      data: discount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating discount'
    });
  }
};

// Delete discount (admin only)
export const deleteDiscount = async (req: Request, res: Response) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    
    if (!discount) {
      return res.status(404).json({
        success: false,
        error: 'Discount not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Discount deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error deleting discount'
    });
  }
};

// Apply discount to order
export const applyDiscount = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    
    const discount = await Discount.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });
    
    if (!discount) {
      return res.status(400).json({
        success: false,
        error: 'Code promo invalide'
      });
    }
    
    const now = new Date();
    const isValid = discount.isActive && 
                    now >= discount.validFrom && 
                    now <= discount.validUntil &&
                    (!discount.maxUsage || discount.usageCount < discount.maxUsage);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Code promo expiré'
      });
    }
    
    // Increment usage count
    discount.usageCount += 1;
    await discount.save();
    
    res.json({
      success: true,
      message: 'Code promo appliqué avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error applying discount'
    });
  }
};
