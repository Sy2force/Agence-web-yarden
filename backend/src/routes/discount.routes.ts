import { Router } from 'express';
import {
  getDiscounts,
  getActiveDiscounts,
  validateDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  applyDiscount
} from '../controllers/discount.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/active', getActiveDiscounts);
router.post('/validate', validateDiscount);
router.post('/apply', applyDiscount);

// Admin routes
router.get('/', authenticate, isAdmin, getDiscounts);
router.post('/', authenticate, isAdmin, createDiscount);
router.put('/:id', authenticate, isAdmin, updateDiscount);
router.delete('/:id', authenticate, isAdmin, deleteDiscount);

export default router;
