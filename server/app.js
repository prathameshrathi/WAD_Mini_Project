var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectMongoDB = require("./config/db");
const cors = require("cors")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth");
const apiErrorHandler = require("./errors/apiErrorhandler");
const compression = require("compression");

var app = express();

connectMongoDB();

app.use(logger("dev"));
app.use(cors({
  origin: "*",
}))
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth",authRouter)
app.use("/blogs", blogRouter);

app.use(apiErrorHandler);

module.exports = app;
