import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders); // ✅ new route

export default router;
