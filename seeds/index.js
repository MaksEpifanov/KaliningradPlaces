const mongoose = require("mongoose");
const Place = require("../models/place");
const cities = require("./locations");
const { places, descriptors } = require("./seedsHelp");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/kaliningradplace");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Place.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCity = Math.floor(Math.random() * 1000);
    const place = new Place({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      // TODO author
      author: "62434d42320843cd12b427f3",
      description:
        "Cupidatat consectetur laboris non sit aute nisi pariatur elit ipsum officia laboris consequat nisi ad. Et magna pariatur aliquip laborum reprehenderit laboris ut eu eu nisi aliquip aliquip esse eiusmod. Incididunt sint cillum do laborum deserunt laborum magna esse ut proident fugiat quis. Velit sit ad nostrud sint commodo proident minim reprehenderit proident tempor est. Fugiat exercitation mollit mollit laborum ea. Laboris laborum pariatur sit nulla tempor anim mollit commodo. Elit sint nisi duis ad mollit.",
      images: [
        {
          url: "https://res.cloudinary.com/dr0eioqqm/image/upload/v1646928814/KaliningradPlaces/n4iqguiinlvfrklsn8ml.jpg",
          filename: "KaliningradPlaces/n4iqguiinlvfrklsn8ml",
        },
        {
          url: "https://res.cloudinary.com/dr0eioqqm/image/upload/v1646928813/KaliningradPlaces/bs881nprol86xpaaga77.jpg",
          filename: "KaliningradPlaces/bs881nprol86xpaaga77",
        },
        {
          url: "https://res.cloudinary.com/dr0eioqqm/image/upload/v1646928813/KaliningradPlaces/xxy2uaecled29wajgfci.jpg",
          filename: "KgdCamp/cm1qxsm0evcb7kd6osv9",
        },
        {
          url: "https://res.cloudinary.com/dr0eioqqm/image/upload/v1646928812/KaliningradPlaces/pl1asvgsglqiu6kmwxbd.jpg",
          filename: "KgdCamp/cm1qxsm0evcb7kd6osv9",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[randomCity].longitude,
          cities[randomCity].latitude,
        ],
      },
    });
    await place.save();
  }
};
seedDB().then(() => mongoose.connection.close());
