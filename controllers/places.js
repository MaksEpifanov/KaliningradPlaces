const Place = require('../models/place');


module.exports.index = async(req, res) => {
  const places = await Place.find({})
  res.render()
}