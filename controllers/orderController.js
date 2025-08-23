import Order from '../models/Order.js';
import Product from '../models/Product.js'; // ✅ import product model

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // ✅ Ensure only ObjectId is stored for product
  const formattedItems = orderItems.map(item => ({
    product: item.product._id || item.product, // handles both {_id: "..."} or "..."
    quantity: item.quantity
  }));

  try {
    // ✅ Check stock before placing order
    for (let item of formattedItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.countInStock}`
        });
      }
    }

    // ✅ Reduce stock
    for (let item of formattedItems) {
      const product = await Product.findById(item.product);
      product.countInStock -= item.quantity;
      await product.save();
    }

    // ✅ Create the order
    const order = new Order({
      user: req.user._id,
      orderItems: formattedItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all orders for the logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product', 'name price') // ✅ show product details
      .sort({ createdAt: -1 }); // latest first

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email") // ✅ show user info
      .populate("orderItems.product", "name price"); // ✅ show product info

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};