const express = require('express');

const router = express.Router();

const passport = require('passport');

const auth = require('../controllers/authentication');

router.route('/register')
  .get(auth.renderRegisterForm)
  .post(auth.registerNewUser);

router.route('/login')
  .get(auth.renderLoginForm)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.loginUser);

router.get('/logout', auth.logoutUser);

module.exports = router;
