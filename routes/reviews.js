const express = require("express");

const router = express.Router({ mergeParams: true });
const review = require("../controllers/reviews");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

const catchAsync = require("../utils/catchAsync");

//* Add review
router.post("/", isLoggedIn, catchAsync(review.addReview));

//* Delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
