import express from 'express';
import {
  getAllPacks,
  getPackBySlug,
  createPack,
  updatePack,
  deletePack
} from '../controllers/packs.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllPacks);
router.get('/:slug', getPackBySlug);

// Admin routes
router.post('/', authenticate, isAdmin, createPack);
router.put('/:id', authenticate, isAdmin, updatePack);
router.delete('/:id', authenticate, isAdmin, deletePack);

export default router;
