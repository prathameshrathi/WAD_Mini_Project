let MODELS = {
    BLOG: "Blog",
    USER: "User",
};

if (process.env.NODE_ENV != "production") {
    Object.entries(MODELS).forEach(([key, val]) => {
        MODELS[key] = "_" + val;
    });
}

module.exports = Object.freeze({ MODELS });
