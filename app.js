if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const engine = require("ejs-mate");
const mongoose = require("mongoose");

const session = require("express-session");
const { sessionSetups } = require("./utils/sessionSetups");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

//NOTE: Security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { helmetSetups } = require("./utils/helmetSetups");

const User = require("./models/user");

//NOTE: Connect mongoose mongoDB
async function main() {
  await mongoose.connect("mongodb://localhost:27017/kaliningradplace");
  console.log("connect to mongoDB");
}
main().catch((err) => console.log(err));

//NOTE: Routers
const indexRouter = require("./routes/index");
const placesRouter = require("./routes/places");
const reviewsRouter = require("./routes/reviews");
const authenticationRouter = require("./routes/authentication");
const profilesRouter = require("./routes/profiles");

const app = express();

//NOTE: View engine setups
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//NOTE: Main setups
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session(sessionSetups));
app.use(flash());
app.use(helmet());
app.use(helmet.contentSecurityPolicy(helmetSetups));

//NOTE: Initial Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//NOTE: Routers
app.use("/", indexRouter);
app.use("/places", placesRouter);
app.use("/places/:id/reviews", reviewsRouter);
app.use("/", authenticationRouter);
app.use("/p", profilesRouter);

//NOTE: catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//NOTE: error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Errror" });
});

module.exports = app;
