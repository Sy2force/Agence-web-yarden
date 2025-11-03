import { Router } from 'express';
import { calculateQuote, createQuote, getAllQuotes, getQuoteById, updateQuoteStatus } from '../controllers/quotes.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { validate, quoteSchema } from '../validators';
import { cacheMiddleware, CACHE_KEYS } from '../utils/cache';

const router = Router();

// Public routes
router.post('/calculate', validate(quoteSchema), cacheMiddleware('quote:calculate', 600), calculateQuote);
router.post('/', createQuote);

// Admin routes
router.get('/', authenticate, isAdmin, getAllQuotes);
router.get('/:id', authenticate, isAdmin, getQuoteById);
router.patch('/:id', authenticate, isAdmin, updateQuoteStatus);

export default router;
