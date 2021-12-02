const Place = require("./models/place");
const Review = require("./models/review");
const User = require("./models/user");

//! protection routers

//* from unregistered users
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Your must be singned in");
    return res.redirect("/login");
  }
  next();
};

//* place route PUT, DELETE
module.exports.isPlaceAuthor = async (req, res, next) => {
  const { id } = req.params;
  const findPlace = await Place.findById(id);
  if (!findPlace) {
    req.flash("error", "Not find place");
    return res.redirect("/places");
  }
  if (!findPlace.author.equals(req.user._id)) {
    req.flash("error", "This place not your");
    return res.redirect(`/places/${id}`);
  }
  next();
};

//* review route (Only registered users can POST, PUT, DELETE)
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const findReview = await Review.findById(reviewId);
  if (!findReview) {
    req.flash("error", "Not find review");
    return res.redirect(`/places/${id}`);
  }
  if (!findReview.author.equals(req.user._id)) {
    req.flash("error", "This review not your");
    return res.redirect(`/places/${id}`);
  }
  next();
};

//* profile route (no access to someone else's profile)
module.exports.isProfileAuthor = async (req, res, next) => {
  const { id } = req.params;
  const profileUser = await User.findById(id);
  if (!profileUser) {
    req.flash("error", "Not found user profile");
    return res.redirect(`/p/${req.user._id}`);
  }
  if (!profileUser._id.equals(req.user._id)) {
    req.flash("error", "Not access this profile");
    return res.redirect(`/p/${req.user._id}`);
  }
  next();
};
