require("dotenv").config();

let conn = null;

module.exports = async () => {
    const mongoose = require("mongoose");
    const mongoDbUrl = process.env.MONGO_URI;

    if (conn == null) {
        conn = mongoose
            .connect(mongoDbUrl, {
                serverSelectionTimeoutMS: 5000,
            })
            .then(() => mongoose);

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn;
        console.log("Connected to MongoDB");
    }

    return conn;
};
