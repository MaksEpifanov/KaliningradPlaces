const User = require('../models/user');

module.exports.renderProfilePage = async (req, res, next) => {
  // TODO data users
  res.render('profiles/index');
};
