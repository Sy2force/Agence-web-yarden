import mongoose, { Document, Schema } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxUsage?: number;
  usageCount: number;
  validFrom: Date;
  validUntil: Date;
  applicableServices?: string[];
  applicablePacks?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const discountSchema = new Schema<IDiscount>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed']
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  minAmount: {
    type: Number,
    default: 0
  },
  maxUsage: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  applicableServices: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }],
  applicablePacks: [{
    type: Schema.Types.ObjectId,
    ref: 'Pack'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for fast lookup
discountSchema.index({ code: 1, isActive: 1 });
discountSchema.index({ validFrom: 1, validUntil: 1 });

// Validate percentage value
discountSchema.pre('save', function(next) {
  if (this.type === 'percentage' && this.value > 100) {
    next(new Error('Percentage discount cannot exceed 100%'));
  }
  next();
});

// Static methods for discount operations
discountSchema.statics.checkValidity = function(discount: any): boolean {
  const now = new Date();
  return discount.isActive && 
         now >= discount.validFrom && 
         now <= discount.validUntil &&
         (!discount.maxUsage || discount.usageCount < discount.maxUsage);
};

discountSchema.statics.applyDiscount = function(discount: any, amount: number): number {
  const now = new Date();
  const isValid = discount.isActive && 
                  now >= discount.validFrom && 
                  now <= discount.validUntil &&
                  (!discount.maxUsage || discount.usageCount < discount.maxUsage);
  
  if (!isValid) return amount;
  if (amount < discount.minAmount) return amount;
  
  if (discount.type === 'percentage') {
    return amount * (1 - discount.value / 100);
  } else {
    return Math.max(0, amount - discount.value);
  }
};

const Discount = mongoose.model<IDiscount>('Discount', discountSchema);

export default Discount;
