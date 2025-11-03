import mongoose, { Schema, Document } from 'mongoose';

export interface IPack extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const PackSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  highlighted: {
    type: Boolean,
    default: false
  },
  badge: String,
  isYearly: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from name before saving
PackSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model<IPack>('Pack', PackSchema);
