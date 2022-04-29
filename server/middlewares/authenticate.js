const jwt = require("jsonwebtoken");
const errors = require("restify-errors");
const User = require("../models/User");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY,
                async (err, payload) => {
                    try {
                        if (err) {
                            throw new errors.UnauthorizedError(err.message);
                        }
                        const user = await User.findById(payload.id);
                        if (user) {
                            req.user = user;
                            next();
                        } else {
                            throw new errors.NotFoundError("User not found!");
                        }
                    } catch (error) {
                        next(error);
                    }
                }
            );
        } else {
            throw new errors.UnauthorizedError("Token not found");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateToken;
