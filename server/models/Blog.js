const mongoose = require("mongoose");
const { MODELS } = require("../config/constants");

const Blog = mongoose.model(
    MODELS.BLOG,
    new mongoose.Schema({
        title: {
            type: String,
            // required: true,
        },
        poster: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
            // required: true,
        },
        content: {
            type: String,
            // required: true,
        },
        isDraft: {
            type: Boolean,
            default: true,
        },
        publishedAt: {
            type: Date,
            default: Date.now(),
        },
        publishedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.USER,
            required: true,
        },
        isTop: {
            type: Boolean,
            default: false,
        },
    })
);

module.exports = Blog;
