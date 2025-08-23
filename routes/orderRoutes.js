import express from 'express';
import { createOrder, getMyOrders, getCustomerOrders } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import Order from "../models/Order.js";

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders); // ✅ new route
router.get("/", protect, isAdmin, getCustomerOrders);

router.put("/:id/packed", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.packed = !order.packed; // toggle true/false
    await order.save();

    res.json({ message: "Order packed status updated", packed: order.packed });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
