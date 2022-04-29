var express = require("express");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
    const user = new User({
        name: "John Doe",
        username: "johndoe",
        password: "12345",
    });
    await user.save();
    res.send(user);
});

module.exports = router;
