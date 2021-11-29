const express = require('express');

const router = express.Router({ mergeParams: true });

const review = require('../controllers/reviews');

//* Add review
router.post('/', review.addReview);

//* Delete review
router.delete('/:reviewId', review.deleteReview);

module.exports = router;
