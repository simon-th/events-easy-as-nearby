// Script to store all Eventbrite categories as objects in our MongoDB database

const axios = require('axios');
const apiKeys = require('../api-keys.json');
const mongoose = require('mongoose');
const Category = require('../mongodb_schemas/Category')

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
var API_URL = `http://api.eventful.com/json/categories/list/?app_key=${apiKeys.eventful}`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

var dbConnected = false;

var db = mongoose.connection;
db.once('open', () => {
  // dbConnected = true;
  console.log('connected to database');
  main();
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

var categories = [];

async function storeCategories() {
  for (var i = 0; i < categories.length; i ++) {
    var model = new Category();
    model.id = categories[i].id;
    model.name = categories[i].name.replace('&amp;', '&');
    await model.save();
    console.log(`stored ${model.name}`);
  }
  console.log('stored categories');
}

async function getCategories() {
  var response = await axios.get(API_URL).catch(function (error) {
    console.log(error.message);
  });
  const info = JSON.parse(JSON.stringify(response.data));
  // console.log(info)
  categories = info.category;
  console.log('got categories');
}

async function waitDb() {
  while (!dbConnected) {
    console.log('a');
  }
}

async function main() {
  // await waitDb();
  console.log('main called!')
  await getCategories();
  await storeCategories();
  process.exit();
}

// var main = main();
