const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Place = require("../models/place");
const User = require("../models/user");
const { cloudinary } = require("../cloudinary");

const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

//* Show all places
module.exports.index = async (req, res) => {
  //* pagination
  const page = parseInt(req.query.page, 10);
  const limit = 9;
  const skipIndex = (page - 1) * limit;
  const places = await Place.find()
    .sort({ _id: 1 })
    .limit(limit)
    .skip(skipIndex)
    .exec();
  places.lastPage = Math.ceil((await Place.countDocuments({})) / limit);
  places.currentPage = page;
  res.render("places/index", {
    places,
    title: "All places in Kaliningrad",
  });
};

//* Create new place
module.exports.renderNewForm = async (req, res) => {
  const id = req.user._id;
  const profile = await User.findById(id);
  res.render("places/create", { title: "Create new place", profile });
};
module.exports.createPlace = async (req, res) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.place.location,
      limit: 1,
    })
    .send();
  const place = new Place(req.body.place);
  place.geometry = geoData.body.features[0].geometry;
  place.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  place.author = req.user._id;
  await place.save();
  req.flash("success", "Success your create new place");
  res.redirect(`places/${place._id}`);
};

//* Show place
module.exports.showPlace = async (req, res) => {
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

//* Edit place
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/edit", { title: `Edit ${place.title}`, place });
};
module.exports.updatePlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, req.body.place);
  const files = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  await place.images.push(...files);
  await place.save();
  if (req.body.deleteImages) {
    for (const filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await place.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Success your update place");
  res.redirect(`/places/${id}`);
};

//* Delete place
module.exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  const findPlace = await Place.findById(id);
  if (findPlace.images) {
    for (const image of findPlace.images) {
      await cloudinary.uploader.destroy(image.filename);
    }
  }
  await Place.findByIdAndDelete(id);
  req.flash("success", "Success your delete place");
  res.redirect(`/p/${req.user._id}/places`);
};
