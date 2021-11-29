const express = require('express');

const router = express.Router();

const multer = require('multer');
const places = require('../controllers/places');

const { storage } = require('../cloudinary');

const upload = multer({ storage });

router.route('/')
  .get(places.index)
  .post(upload.array('image'), places.createPlace);

router.get('/create', places.renderNewForm);

router.route('/:id')
  .get(places.showPlace)
  .put(places.updatePlace)
  .delete(places.deletePlace);

router.get('/:id/edit', places.renderEditForm);

module.exports = router;
