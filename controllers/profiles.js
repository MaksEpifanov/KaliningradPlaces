const User = require("../models/user");
const Place = require("../models/place");

module.exports.renderProfilePage = async (req, res, next) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render("profile/edit", { title: `${profile.username}`, profile });
};

module.exports.renderProfilePlaces = async (req, res, next) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  const places = await Place.find({ author: id });
  res.render("profile/places", {
    title: `All places ${profile.username}`,
    profile,
    places,
  });
};
