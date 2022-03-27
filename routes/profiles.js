const express = require("express");

const router = express.Router();
const multer = require("multer");
const profiles = require("../controllers/profiles");
const { isLoggedIn, isProfileAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const { storageUser } = require("../cloudinary");
const upload = multer({ storage: storageUser });

router
  .route("/:id")
  // .get(isLoggedIn, isProfileAuthor, catchAsync(profiles.renderProfilePage))
  .get(catchAsync(profiles.renderProfilePage))
  .put(
    // isLoggedIn,
    upload.array("image"),
    // isProfileAuthor,
    catchAsync(profiles.updateProfile)
  );

router.get(
  "/:id/places",
  // isLoggedIn,
  // isProfileAuthor,
  catchAsync(profiles.renderProfilePlaces)
);

module.exports = router;
