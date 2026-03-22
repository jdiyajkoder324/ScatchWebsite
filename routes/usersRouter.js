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

router.post("/login", (req, res) => {
  console.log("Login hit ✅", req.body);
  res.send("User logged in");
});

// MUST export router directly
module.exports = router;