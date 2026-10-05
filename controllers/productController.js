const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (Number(price) <= 0) {
      return res.status(400).json({ message: 'Price must be greater than zero.' });
    }
    const product = new Product({ name, price: Number(price), imageUrl });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, createProduct }; // <-- Ye export check kar lo!