// Script to store all Google restaurants as objects in our MongoDB database

const axios = require('axios');
const apiKeys = require('../api-keys.json');
const mongoose = require('mongoose');
const Restaurant = require('../mongodb_schemas/Restaurant');
const circles = require('./circle-list');

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const latitude = '30.2862175';
const longitude = '-97.739388';
const radius = '25000'
// var API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKeys.googlePlaces}`;
var count = 0;

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
  for (var i = 0; i < restaurants.length; i++) {
    for (var j = 0; j < restaurants[i].length; j++) {
      var model = new Restaurant();
      var result = restaurants[i][j];
      model.name = result.name;
      model.latitude = result.geometry.location.lat;
      model.longitude = result.geometry.location.lng;
      model.address = result.vicinity;
      model.price_level = result.price_level;
      model.rating = result.rating;
      model.num_ratings = result.user_ratings_total;
      await model.save();
      console.log(`stored ${model.name}`);
      count ++;
    }
  }
  console.log('stored restaurants');
}

function sleep(ms){
   return new Promise(resolve=>{
       setTimeout(resolve,ms)
   })
}

async function getRestaurants() {
  const num_pages = 3;
  for (var j = 0; j < circles.length; j++) {
    const latitude = circles[j].latitude;
    const longitude = circles[j].longitude;
    const radius = circles[j].radius;
    var API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKeys.googlePlaces}`;
    for (var i = 0; i < num_pages; i++) {
      var response = await axios.get(API_URL).catch(function (error) {
        console.log(error.message);
      });
      const info = JSON.parse(JSON.stringify(response.data));
      restaurants.push(info.results);
      if (info.results.length > 0) {
        console.log(`got page ${i+1}`);
      } else {
        console.log(info);
      }
      if (info.hasOwnProperty('next_page_token')) {
        const pagetoken = info.next_page_token;
        API_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKeys.googlePlaces}&pagetoken=${pagetoken}`;
        await sleep(2000);
      } else {
        break;
      }
    }
  }
}

async function main() {
  // await waitDb();
  console.log('main called!')
  await getRestaurants();
  await storeRestaurants();
  console.log(`${count} restaurants stored`);
  process.exit();
}

// var main = main();
