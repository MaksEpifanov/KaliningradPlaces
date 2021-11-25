const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render('profile/edit', { title: `${profile.username}`, profile})
})

module.exports = router;