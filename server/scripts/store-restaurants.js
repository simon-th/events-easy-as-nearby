// Script to store all Google restaurants as objects in our MongoDB database

const axios = require('axios');
const apiKeys = require('../api-keys.json');
const mongoose = require('mongoose');
const Category = require('../mongodb_schemas/Category')
const googleMapsClient = require('@google/maps').createClient({
  key: `${apiKeys.googlePlaces}`
});

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const latitude = '30.2862175';
const longitude = '-97.739388';
const radius = '25000'
// var API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKeys.googlePlaces}`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.once('open', () => {
  // dbConnected = true;
  console.log('connected to database');
  main();
});

db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

var restaurants = [];

async function storeRestaurants() {
  for (var i = 0; i < categories.length; i ++) {
    var model = new Category();
    model.id = categories[i].id;
    model.name = categories[i].name.replace('&amp;', '&');
    await model.save();
    console.log(`stored ${model.name}`);
  }
  console.log('stored categories');
}

async function getRestaurants() {

}

async function waitDb() {
  while (!dbConnected) {
    console.log('a');
  }
}

async function main() {
  // await waitDb();
  console.log('main called!')
  await getRestaurants();
  console.log(restaurants.length);
  console.log(restaurants[0].length);
  console.log(restaurants[1].length);
  console.log(restaurants[2].length);
  // await storeCategories();
  process.exit();
}

// var main = main();
