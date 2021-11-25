const express = require('express');
const router = express.Router();

const places = require('../controllers/places')

router.route('/')
  .get(places.index)
  .post(places.createPlace);

router.get('/create', places.renderNewForm);

router.route('/:id')
  .get(places.showPlace)
  .put(places.updatePlace)
  .delete(places.deletePlace);

router.get('/:id/edit', places.renderEditForm)

module.exports = router;