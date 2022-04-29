// create a mongoose user model with the fields name, username and password

const mongoose = require("mongoose");
const { MODELS } = require("../config/constants");

const User = mongoose.model(
    MODELS.USER,
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    delete ret.password;
                },
            },
        }
    )
);

module.exports = User;
