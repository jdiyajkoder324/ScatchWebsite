// middlewares/isLoggedIn.js

module.exports = function (req, res, next) {
    // Check if user is logged in
    // Assuming you set req.user when user logs in
    if (!req.user) {
        // Set flash message
        req.flash("error", "You must log in first");

        // Redirect to home or login page
        return res.redirect("/");
    }

    // If logged in, proceed to next middleware / route
    next();
};