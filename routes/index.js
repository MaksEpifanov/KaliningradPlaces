const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Kaliningrad Places' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About project' });
});

module.exports = router;
