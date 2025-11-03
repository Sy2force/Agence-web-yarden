import { Router } from 'express';
import { createContact, getAllContacts, updateContactStatus, deleteContact } from '../controllers/contact.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { validate, contactSchema } from '../validators';

const router = Router();

// Public route
router.post('/', validate(contactSchema), createContact);

// Admin routes
router.get('/', authenticate, isAdmin, getAllContacts);
router.patch('/:id', authenticate, isAdmin, updateContactStatus);
router.delete('/:id', authenticate, isAdmin, deleteContact);

export default router;
