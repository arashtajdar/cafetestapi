import { Router } from 'express';
import cafeController from '../controllers/cafeController.js';
import { basicAuth } from '../middleware/auth.js';

const router = Router();

// Apply basic auth middleware to all routes in this router
router.use(basicAuth);

// Cafes Management
router.get('/cafes', cafeController.getAllCafes);
router.get('/cafes/search', cafeController.searchCafes);
router.get('/cafes/:id', cafeController.getCafeById);

// Favorites Management
router.get('/favorites', cafeController.getFavorites);
router.post('/favorites', cafeController.addFavorite);
router.delete('/favorites/:id', cafeController.removeFavorite);

export default router;
