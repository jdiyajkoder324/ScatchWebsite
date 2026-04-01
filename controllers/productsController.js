const Product = require("../models/product-model");

exports.createProduct = async (req, res) => {
  try {

    const { name, price, description } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      message: "Product Added Successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};