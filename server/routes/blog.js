var express = require("express");
const fs = require("fs/promises");
const path = require("path");
const restErrors = require("restify-errors");
const authenticateToken = require("../middlewares/authenticate");
const blogContentMulter = require("../middlewares/blogContentMulter");
const blogMulter = require("../middlewares/blogMulter");
const Blog = require("../models/Blog");
const User = require("../models/User");
var router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const blogs = await Blog.find().populate("publishedBy");
        res.send(blogs);
    } catch (error) {
        next(error);
    }
});

router.get("/:blogId", async function (req, res, next) {
    try {
        const blog = await Blog.findById(req.params.blogId).populate(
            "publishedBy"
        );
        res.send(blog);
    } catch (error) {
        next(error);
    }
});

// delete blog
router.delete("/:blogId", authenticateToken, async function (req, res, next) {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (
            !!blog.poster &&
            (await fs
                .access(path.join(__dirname, "../public", blog.poster))
                .then(() => true)
                .catch(() => false))
        )
            await fs.unlink(path.join(__dirname, "../public", blog.poster));
        await blog.remove();
        res.send(blog);
    } catch (error) {
        next(error);
    }
});

// edit blog
router.put(
    "/:blogId",
    blogMulter,
    authenticateToken,
    async function (req, res, next) {
        try {
            let blog = await Blog.findById(req.params.blogId);
            // console.log(blog)
            if (!blog) throw new restErrors.NotFoundError("Blog not found");
            if (
                typeof req.body?.poster == "string" &&
                req.body.poster !== blog?.poster
            ) {
                if (
                    !!blog.poster &&
                    (await fs
                        .access(path.join(__dirname, "../public", blog.poster))
                        .then(() => true)
                        .catch(() => false))
                ) {
                    await fs.unlink(
                        path.join(__dirname, "../public", blog.poster)
                    );
                }
            }

            await blog.update(req.body);
            blog = await Blog.findById(req.params.blogId);
            res.send(blog);
        } catch (error) {
            next(error);
        }
    }
);

// create blog
router.post(
    "/",
    blogMulter,
    authenticateToken,
    async function (req, res, next) {
        try {
            const blog = new Blog({
                ...req.body,
                publishedBy: req.user._id,
            });
            await blog.save();
            res.send(blog);
        } catch (error) {
            next(error);
        }
    }
);

// blog content images
router.post(
    "/content/image",
    authenticateToken,
    blogContentMulter,
    async function (err, req, res, next) {
        if (err)
            return res.json({
                error: "Error uploading file",
            });
        next(err);
    },
    async function (req, res, next) {
        if (req?.err) {
            res.json({
                error: "Error uploading file",
            });
            return next(err);
        } else {
            return res.json({
                url: req?.url,
            });
        }
    }
);

module.exports = router;
