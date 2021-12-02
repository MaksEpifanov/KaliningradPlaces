const express = require("express");

const router = express.Router();

const multer = require("multer");
const { isLoggedIn, isPlaceAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../cloudinary");
const places = require("../controllers/places");

const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(places.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    isPlaceAuthor,
    catchAsync(places.createPlace)
  );

router.get("/create", isLoggedIn, catchAsync(places.renderNewForm));

router
  .route("/:id")
  .get(catchAsync(places.showPlace))
  .put(
    isLoggedIn,
    isPlaceAuthor,
    upload.array("image"),
    catchAsync(places.updatePlace)
  )
  .delete(isLoggedIn, isPlaceAuthor, catchAsync(places.deletePlace));

router.get("/:id/edit", catchAsync(places.renderEditForm));
// TODO protect this rout

module.exports = router;
