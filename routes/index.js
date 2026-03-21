const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


// Home page (no login required)
router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

// Shop (requires login)
router.get("/shop", isLoggedIn, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

// Cart (requires login)
router.get("/cart", isLoggedIn, async function (req, res) {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    let bill = 0;
    user.cart.forEach(item => {
        bill += item.price - item.discount + 20;
    });

    res.render("cart", { user, bill });
});

// Add to cart
router.get("/addtocart/:productId", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save();

    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

// Logout
router.get("/logout", isLoggedIn, function (req, res) {
    res.clearCookie("token"); // assuming JWT cookie
    res.redirect("/");
});

// ✅ Export router
module.exports = router;