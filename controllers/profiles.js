const User = require("../models/user");
const Place = require("../models/place");

module.exports.renderProfilePage = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render("profile/edit", { title: `${profile.username}`, profile });
};

module.exports.renderProfilePlaces = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  const places = await Place.find({ author: id });
  res.render("profile/places", {
    title: `All places ${profile.username}`,
    profile,
    places,
  });
};

module.exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findByIdAndUpdate(id, req.body.profile);
  req.flash("success", "Success your update profile");
  res.redirect(`/p/${id}`);
};
