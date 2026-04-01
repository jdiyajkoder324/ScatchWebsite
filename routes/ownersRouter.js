const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        try {
            let owner = await ownerModel.create(req.body);
            res.send(owner); // or res.redirect(...)
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
}

router.get("/login", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts", { success });
});

router.get("/dashboard",(req,res)=>{
res.render("dashboard");
});

module.exports = router;