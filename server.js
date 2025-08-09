import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // ✅ Import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); // ✅ Mount before starting server

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
