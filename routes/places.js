const express = require("express");

const router = express.Router();

const multer = require("multer");
const { isLoggedIn, isAuthor } = require("../middleware");
const { storage } = require("../cloudinary");
const places = require("../controllers/places");

const upload = multer({ storage });

router
  .route("/")
  .get(places.index)
  .post(isLoggedIn, upload.array("image"), isAuthor, places.createPlace);

router.get("/create", isLoggedIn, places.renderNewForm);

router
  .route("/:id")
  .get(places.showPlace)
  .put(isLoggedIn, isAuthor, upload.array("image"), places.updatePlace)
  .delete(isLoggedIn, isAuthor, places.deletePlace);

router.get("/:id/edit", places.renderEditForm);

module.exports = router;
