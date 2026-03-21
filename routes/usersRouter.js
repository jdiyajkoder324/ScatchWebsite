const express = require("express");
const router = express.Router();

// Example routes
router.get("/", (req, res) => {
    res.send("Users Home Page");
});

router.get("/profile", (req, res) => {
    res.send("User Profile Page");
});

// MUST export router directly
module.exports = router;