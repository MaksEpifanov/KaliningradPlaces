const express = require("express");

const router = express.Router();
const {
  renderProfilePage,
  renderProfilePlaces,
} = require("../controllers/profiles");
const { isLoggedIn, isProfileAuthor } = require("../middleware");

router.get("/:id", isLoggedIn, isProfileAuthor, renderProfilePage);

router.get("/:id/places", isLoggedIn, isProfileAuthor, renderProfilePlaces);

module.exports = router;
