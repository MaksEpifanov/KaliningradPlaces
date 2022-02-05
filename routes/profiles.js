const express = require("express");

const router = express.Router();
const profiles = require("../controllers/profiles");
const { isLoggedIn, isProfileAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get(
  "/:id",
  isLoggedIn,
  isProfileAuthor,
  catchAsync(profiles.renderProfilePage)
);

router.get(
  "/:id/places",
  isLoggedIn,
  isProfileAuthor,
  catchAsync(profiles.renderProfilePlaces)
);

module.exports = router;
