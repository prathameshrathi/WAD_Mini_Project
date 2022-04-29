const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const FOLDER_PATH = "public/uploads/images";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../${FOLDER_PATH}`));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = nanoid();
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, `${uniqueSuffix}-${fileName}`);
    },
});

const upload = multer({ storage: storage });

module.exports = (req, res, next) => {
    console.log("url hit");
    upload.single("upload")(req, res, function (err) {
        req.err = null;
        if (err instanceof multer.MulterError) {
            req.err = err;
            return next(err);
        } else if (err) {
            req.err = err;
            return next(err);
        }

        let url = `${req.protocol}://${req.get("host")}/uploads/images/${
            req.file.filename
        }`;
        req.url = url;
        return next();
    });
};
