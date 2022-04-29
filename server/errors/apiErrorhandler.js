const errors = require("restify-errors");
const fs = require("fs");

function apiErrorHandler(err, req, res, next) {
    console.error(err);
    if (req?.file) {
        try {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
        } catch (error) {
            console.log("file delete error", error);
        }
    }
    if (err.statusCode) {
        return res.status(err.statusCode).json(err);
    }
    return res
        .status(500)
        .send(new errors.InternalServerError("Something went wrong"));
}

module.exports = apiErrorHandler;
