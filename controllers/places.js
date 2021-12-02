const Place = require("../models/place");

// TODO Cloudinary images

// TODO mapbox geocoding

module.exports.index = async (req, res, next) => {
  const places = await Place.find({});
  res.render("places/index", { places, title: "All places in Kaliningrad" });
};

module.exports.renderNewForm = (req, res, next) => {
  res.render("places/create", { title: "Create new place" });
};

module.exports.createPlace = async (req, res, next) => {
  // TODO add geoData with geocoding

  const place = new Place(req.body.place);
  place.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  place.author = req.user._id;

  // TODO place.geometry add

  await place.save();
  req.flash("success", "Success your create new place");
  res.redirect(`places/${place._id}`);
};

module.exports.showPlace = async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!place) {
    req.flash("error", "Not find place");
    res.redirect("/places");
  }
  res.render("places/show", { title: `${place.title}`, place, id });
};

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/edit", { title: `Edit ${place.title}`, place });
};

module.exports.updatePlace = async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, req.body.place);
  const files = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  await place.images.push(...files);
  await place.save();
  // TODO delete cloudinary image
  req.flash("success", "Success your update place");
  res.redirect(`/places/${id}`);
};

module.exports.deletePlace = async (req, res, next) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  req.flash("success", "Success your delete place");
  res.redirect("/places");
};
