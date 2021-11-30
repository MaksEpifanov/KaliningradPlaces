const Places = require('../models/place');
const Review = require('../models/review');

//* Add review
module.exports.addReview = async (req, res, next) => {
  const { id } = req.params;
  const place = await Places.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  place.reviews.push(review);
  await place.save();
  await review.save();
  req.flash('success', 'Your create new review');
  res.redirect(`/places/${place._id}`);
};

//* Delete review
module.exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Places.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Your delete review');
  res.redirect(`/places/${id}`);
};
