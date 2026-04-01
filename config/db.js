require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

console.log("Mongo URI =", process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    dbgr("MongoDB connected");
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

const db = mongoose.connection;

module.exports = db;