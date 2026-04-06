const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

// Routers
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

// DB connection


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.loggedin = false;
    res.locals.success = "";
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Debugging: check routers before mounting
console.log("index =", indexRouter);
console.log("ownersRouter =", ownersRouter);
console.log("usersRouter =", usersRouter);
console.log("productsRouter =", productsRouter);

// Mount routers
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


console.log("ENV:", process.env.NODE_ENV);
console.log("Mongo:", process.env.MONGODB_URI);



// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});