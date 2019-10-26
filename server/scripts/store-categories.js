// Script to store all Eventbrite categories as objects in our MongoDB database

const axios = require('axios');
const apiKeys = require('../api-keys.json');
const mongoose = require('mongoose');
const Category = require('../mongodb_schemas/Category')

const DATABASE_NAME = 'explocation';
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

async function storeCategories() {
  for (var i = 0; i < categories.length; i ++) {
    var model = new Category(categories[i]);
    await model.save();
    console.log(`stored ${model.name}`);
  }
  console.log('stored categories');
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
  await storeCategories();
  process.exit();
}

var main = main();
