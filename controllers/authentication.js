const User = require("../models/user");

const nameRegexp =
  /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gi;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/gi;
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

module.exports.renderRegisterForm = (req, res) => {
  res.render("authentication/register", {
    title: "Register new user",
  });
};
module.exports.registerNewUser = async (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      firstname = null,
      lastname = null,
    } = req.body;
    if (!nameRegexp.test(username)) {
      throw new Error(
        "Incorrect name (The name must include letters, numbers, _)"
      );
    }
    if (!emailRegexp.test(email)) {
      throw new Error("Incorrect email");
    }
    if (!passwordRegexp.test(password)) {
      throw new Error(
        "Incorrect password (Minimum 6 characters, at least one letter and one number:)"
      );
    }
    const user = new User({ email, username, firstname, lastname });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) next(err);
      req.flash("success", "Welcome to Kaliningrade place");
      res.redirect("/places");
    });
  } catch (e) {
    if (e.code === 11000) {
      req.flash("error", "Email is already in use");
    } else {
      req.flash("error", e.message);
    }
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("authentication/login", { title: "Login", activePage: "Login" });
};
module.exports.loginUser = async (req, res) => {
  const redirectUrl = req.session.returnTo || "/places?page=1";
  delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "Your logout");
  res.redirect("/");
};
