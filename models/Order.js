import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    mobileNumber: String,  // ✅ added
  },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });


export default mongoose.model('Order', orderSchema);
