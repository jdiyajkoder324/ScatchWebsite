const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose
    .connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(function () {
        dbgr("connected");
    })
    .catch(function (err) {
        dbgr(err);
    });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = mongoose.connection;