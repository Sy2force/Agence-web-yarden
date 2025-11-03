import mongoose, { Schema, Document } from 'mongoose';

export interface IQuoteItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IQuote extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectType: string;
  pageCount: number;
  items: IQuoteItem[];
  totalPrice: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  clientPhone: String,
  projectType: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true,
    min: 1
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected'],
    default: 'draft'
  },
  notes: String
}, {
  timestamps: true
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);
