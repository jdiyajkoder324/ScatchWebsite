const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        minLength: 3,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    isadmin: {
        type: Boolean,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    contact: {
        type: String,
        required: true
    },
    picture: String
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);