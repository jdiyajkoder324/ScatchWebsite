const Owner = require("../models/owner-model");
const Product = require("../models/product-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerOwner = async (req, res) => {
  try {

    const { fullname, email, password } = req.body;

    const ownerExists = await Owner.findOne({ email });

    if (ownerExists) {
      return res.status(400).json({
        message: "Owner already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      fullname,
      email,
      password: hash
    });

    res.status(201).json({
      message: "Owner Registered",
      owner
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.loginOwner = async (req, res) => {
  try {

    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(400).json({
        message: "Owner not found"
      });
    }

    const isMatch = await bcrypt.compare(password, owner.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      { id: owner._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Owner Login Successful",
      token,
      owner
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.addProduct = async (req, res) => {
  try {

    const { name, price, description } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      message: "Product Added",
      product
    });

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



exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};