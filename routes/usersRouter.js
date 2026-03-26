const express = require("express");
const router = express.Router();

// Example routes
router.get("/", (req, res) => {
    res.send("Users Home Page");
});

router.get("/profile", (req, res) => {
    res.send("User Profile Page");
});

router.get("/login", (req, res) => {
  res.send("Login page working");
});

router.post("/register", (req, res) => {
    console.log(req.body);
    res.send("Register page working");
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password === password) {
            res.redirect("/products");  // 👈 redirect here
        } else {
            res.send("Invalid credentials");
        }

    } catch (err) {
        res.send(err.message);
    }
});

// MUST export router directly
module.exports = router;