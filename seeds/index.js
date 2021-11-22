const mongoose = require('mongoose');
const Place = require('../models/place');
const cities = require('./locations');
const { places, descriptors } = require('./seedsHelp')

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/kaliningradplace");
};

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Place.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCity = Math.floor(Math.random() * 1000);
    const place = new Place({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      // TODO author
      description: 'Cupidatat consectetur laboris non sit aute nisi pariatur elit ipsum officia laboris consequat nisi ad. Et magna pariatur aliquip laborum reprehenderit laboris ut eu eu nisi aliquip aliquip esse eiusmod. Incididunt sint cillum do laborum deserunt laborum magna esse ut proident fugiat quis. Velit sit ad nostrud sint commodo proident minim reprehenderit proident tempor est. Fugiat exercitation mollit mollit laborum ea. Laboris laborum pariatur sit nulla tempor anim mollit commodo. Elit sint nisi duis ad mollit.',
      images: [
        {
          url: '',
          filename: ''
        },
        {
          url: '',
          filename: ''
        },
        // TODO geometry
      ]
    });
    await place.save()
  }
};
seedDB().then(() => mongoose.connection.close());
