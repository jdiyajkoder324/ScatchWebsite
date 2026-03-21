// config/multer-config.js
const multer = require("multer");
const path = require("path");

// Make sure upload folder exists: public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

// Only allow image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;