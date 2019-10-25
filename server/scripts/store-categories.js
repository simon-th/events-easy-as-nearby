const axios = require('axios');
const apiKeys = require('./api-keys.json');
const mongoose = require('mongoose');
const Category = require('../mongodb_schemas/Category')

const DATABASE_NAME = 'events';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
var EVENTBRITE_URL = `https://www.eventbriteapi.com/v3/categories/?token=${apiKeys.eventbrite}`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.once('open', () => {
  dbConnected = true;
  console.log('connected to database');
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

var categories = [];
// var dbConnected = false;

async function saveCategory(category) {
  // console.log(category);
  await category.save((err) => {
    if (err) return console.err(err);
    console.log('tried to save..');
  });
}

async function storeMusic() {
  var music = {
    'resource_uri': 'https://www.eventbriteapi.com/v3/categories/103/',
    'id': '103',
    'name': 'Music',
    'name_localized': 'Music',
    'short_name': 'Music',
    'short_name_localized': 'Music'
  }
  var musicModel = new Category(music);
  await saveCategory(musicModel);
  console.log('music saved?');
}

async function getCategories() {
  var response = await axios.get(EVENTBRITE_URL).catch(function (error) {
    console.log(error.message);
  });
  const info = JSON.parse(JSON.stringify(response.data));
  categories = info.categories;
  console.log('got categories');
}

// async function waitDb() {
//   while (!dbConnected);
//   console.log('connected to database');
// }

async function main() {
  // await waitDb();
  await getCategories();
  await storeMusic();
  process.exit();
}

var main = main();
