const express = require("express");

const router = express.Router();
const multer = require("multer");
const profiles = require("../controllers/profiles");
const { isLoggedIn, isProfileAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const { storageUser } = require("../cloudinary");
const upload = multer({ storage: storageUser });

//* Profile page
router
  .route("/:id")
  .get(isLoggedIn, isProfileAuthor, catchAsync(profiles.renderProfilePage))
  .put(
    isLoggedIn,
    upload.array("image"),
    isProfileAuthor,
    catchAsync(profiles.updateProfile)
  );

//* Profile place page
router.get(
  "/:id/places",
  isLoggedIn,
  isProfileAuthor,
  catchAsync(profiles.renderProfilePlaces)
);

module.exports = router;
