import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  clearCart,
  removeCartItem
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes below require login

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeCartItem);
router.delete('/clear', clearCart); // DELETE /api/cart/clear

export default router;
