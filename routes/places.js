const express = require("express");

const router = express.Router();
const multer = require("multer");
const { storagePlace } = require("../cloudinary");

const upload = multer({ storage: storagePlace });
const { isLoggedIn, isPlaceAuthor } = require("../middleware");
const {
  validatePlace,
  validateCreatePlaceImages,
} = require("../models/validateSchema");
const places = require("../controllers/places");
const catchAsync = require("../utils/catchAsync");

//* Place page, create new place(POST).
router
  .route("/")
  .get(catchAsync(places.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validatePlace,
    validateCreatePlaceImages,
    catchAsync(places.createPlace)
  );

//* Create new place (GET)
router.get("/create", isLoggedIn, catchAsync(places.renderNewForm));

//* Show, update, delete place page
router
  .route("/:id")
  .get(catchAsync(places.showPlace))
  .put(
    isLoggedIn,
    isPlaceAuthor,
    upload.array("image"),
    validatePlace,
    catchAsync(places.updatePlace)
  )
  .delete(isLoggedIn, isPlaceAuthor, catchAsync(places.deletePlace));

//* Edit page
router.get(
  "/:id/edit",
  isLoggedIn,
  isPlaceAuthor,
  catchAsync(places.renderEditForm)
);

module.exports = router;
