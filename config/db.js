require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    dbgr("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;