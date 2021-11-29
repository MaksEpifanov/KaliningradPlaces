const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('authentication/register', { title: 'Register new user' });
};
module.exports.registerNewUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Kaliningrade place');
      res.redirect('/places');
    });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      req.flash('error', 'Email is already in use');
    } else {
      req.flash('error', e.message);
    }
    res.redirect('/register');
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render('authentication/login', { title: 'Login' });
};
module.exports.loginUser = async (req, res, next) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = req.session.returnTo || '/places';
  delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'Your logout');
  res.redirect('/');
};
