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
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

//* Dev livereload
const helmetSrc = require("./utils/helmetSrs");

const User = require("./models/user");

//* connect mongoose mongoDB

async function main() {
  await mongoose.connect("mongodb://localhost:27017/kaliningradplace");
  console.log("connect to mongoDB");
}
main().catch((err) => console.log(err));

//* Routers
const indexRouter = require("./routes/index");
const placesRouter = require("./routes/places");
const reviewsRouter = require("./routes/reviews");
const authenticationRouter = require("./routes/authentication");
const profilesRouter = require("./routes/profiles");

const app = express();

//* view engine setup
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true, // Only HTTPS
      expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...helmetSrc.connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...helmetSrc.scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...helmetSrc.styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:", ...helmetSrc.imagesSrcUrls],
      fontSrc: ["'self'", ...helmetSrc.fontSrcUrls],
    },
  })
);

//* Initial Passport
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

//* Routers
app.use("/", indexRouter);
app.use("/places", placesRouter);
app.use("/places/:id/reviews", reviewsRouter);
app.use("/", authenticationRouter);
app.use("/p", profilesRouter);

//* catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//* error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Errror" });
});

module.exports = app;
