import express from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/services.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post('/', authenticate, isAdmin, createService);
router.put('/:id', authenticate, isAdmin, updateService);
router.delete('/:id', authenticate, isAdmin, deleteService);

export default router;
