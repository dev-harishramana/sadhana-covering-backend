import Product from "../models/Product.js";

// @desc Get all products
export const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// @desc Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create a new product (Admin only)
export const createProduct = async (req, res) => {
  const { name, description, price, category, countInStock, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      image,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid product data" });
  }
};

// @desc Update product (Admin only)
export const updateProduct = async (req, res) => {
  const { name, description, price, category, countInStock, image } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

// @desc Delete product (Admin only)
// @desc Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product removed" });
  } catch (err) {
    console.error("Error deleting product:", err); // Always log server errors
    res.status(500).json({ message: "Delete failed" });
  }
};





