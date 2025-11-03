import express from 'express';
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projects.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.post('/', authenticate, isAdmin, createProject);
router.put('/:id', authenticate, isAdmin, updateProject);
router.delete('/:id', authenticate, isAdmin, deleteProject);

export default router;
