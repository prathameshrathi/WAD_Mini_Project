var express = require("express");
const User = require("../models/User");
const errors = require("restify-errors");
const jwt = require("jsonwebtoken");
var router = express.Router();

const generateTokens = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "7d",
        }
    );

    return { token, refreshToken };
};

router.post("/createUser", async function (req, res, next) {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        return res.send(user);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async function (req, res, next) {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            throw new errors.NotFoundError("User not found");
        }
        if (user.password !== req.body.password) {
            throw new errors.BadRequestError("Password is incorrect");
        }
        const { token, refreshToken } = generateTokens(user);

        delete user.password;

        return res.send({
            user,
            token,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/refreshToken", async function (req, res, next) {
    try {
        const token = req.body.refreshToken;
        if (!token) {
            throw new errors.BadRequestError("Token not found");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new errors.NotFoundError("User not found");
        }
        const { token: newToken, refreshToken } = generateTokens(user);
        return res.send({
            user,
            token: newToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
