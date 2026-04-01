const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

// Users Home
router.get("/", (req, res) => {
    res.send("index");
});

router.get("/register",(req,res)=>{
    res.render("users/register");
});


// Profile
router.get("/profile", (req, res) => {
    res.send("profile");
});

// Login Page
router.get("/login", (req, res) => {
    res.render("users/login", { loggedin: false });
});

// Register
router.post("/register", async (req, res) => {
    try {

        console.log("Form data:", req.body);

        const { fullName, email, password, contact } = req.body;

        const user = await User.create({
            fullName,
            email,
            password,
            contact
        });
        console.log("Saved user:", user);

        res.redirect("/users/login")

    } catch (err) {
        res.send(err.message);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt:", req.body);

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