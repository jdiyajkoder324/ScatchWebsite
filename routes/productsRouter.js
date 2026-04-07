const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

// GET /products/ → Products Home Page
router.get("/", (req, res) => {
    res.send("products");
});

router.get("/create",(req,res)=>{
    res.render("products/createproducts",{ 
        success: req.flash ("success")
    });
});

const productModel = require("../models/product-model");

router.get("/view", async (req, res) => {
    const products = await productModel.find();
    res.render("products/viewproducts", { products });
});

router.get("/cart",isLoggedIn, async (req, res) => {
    const user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    res.render("products/cart", { cart: user.cart });
});

// POST /products/create → Create product with image upload
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        // validations
        if (!name || !price) {
            req.flash("error", "Name and price are required");
            return res.redirect("/owners/admin");
        }

        if (!req.file) {
            req.flash("error", "Image is required");
            return res.redirect("/owners/admin");
        }

        // convert to numbers
        price = Number(price);
        discount = Number(discount) || 0;

        // create product in DB
        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.filename
        });

        req.flash("success", "Product created successfully.");
        res.redirect("/owners/admin");

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/owners/admin");
    }
});

// ✅ Export router directly
module.exports = router;