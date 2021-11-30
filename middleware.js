const Place = require("./models/place");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Your must be singned in");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
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
