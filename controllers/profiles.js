const User = require("../models/user");
const Place = require("../models/place");
const { cloudinary } = require("../cloudinary");

module.exports.renderProfilePage = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render("profile/edit", { title: `${profile.username}`, profile });
};

//NOTE: Profile places
module.exports.renderProfilePlaces = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findById(id);

  //NOTE: pagination
  const page = parseInt(req.query.page, 10);
  const limit = 9;
  const skipIndex = (page - 1) * limit;
  const places = await Place.find({ author: id })
    .sort({ _id: 1 })
    .limit(limit)
    .skip(skipIndex)
    .exec();
  console.log(profile);
  places.lastPage = Math.ceil((await Place.countDocuments({})) / limit);
  places.currentPage = page;
  res.render("profile/places", {
    title: `All places ${profile.username}`,
    profile,
    places,
  });
};

module.exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findByIdAndUpdate(id, req.body.profile);
  if (req.files[0] && profile.image.url) {
    await cloudinary.uploader.destroy(profile.image.filename);
  }
  if (req.files[0]) {
    profile.image = {
      url: req.files[0].path,
      filename: req.files[0].filename,
    };
  }
  profile.save();
  req.flash("success", "Success your update profile");
  res.redirect(`/p/${id}`);
};
