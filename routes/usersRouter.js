const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

// Users Home
router.get("/", (req, res) => {
    res.send("Users Home Page");
});

// Profile
router.get("/profile", (req, res) => {
    res.send("User Profile Page");
});

// Login Page
router.get("/login", (req, res) => {
    res.send("Login page working");
});

// Register
router.post("/register", async (req, res) => {
    try {

        const { fullName, email, password, contact } = req.body;

        const user = await User.create({
            fullName,
            email,
            password,
            contact
        });

        res.send("User registered successfully");

    } catch (err) {
        res.send(err.message);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password === password) {
            res.redirect("/products");
        } else {
            res.send("Invalid password");
        }

    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;