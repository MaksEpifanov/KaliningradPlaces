const express = require("express");
const { isExpression } = require("joi");

const router = express.Router();
const profiles = require("../controllers/profiles");
const { isLoggedIn, isProfileAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/:id")
  .get(isLoggedIn, isProfileAuthor, catchAsync(profiles.renderProfilePage))
  .put(isLoggedIn, isProfileAuthor, catchAsync(profiles.updateProfile));

router.get(
  "/:id/places",
  isLoggedIn,
  isProfileAuthor,
  catchAsync(profiles.renderProfilePlaces)
);

module.exports = router;
