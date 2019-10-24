const request = require('request');
const apiKeys = require('./api-keys.json');

const mongoose = require("mongoose");
const CONNECTION_URL = "mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "explocation_database";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.once("open", () => console.log("connected to database"));
db.on("error", console.error.bind(console, "Mongo connection error"));

var url = `https://www.eventbriteapi.com/v3/categories/?token=${apiKeys.eventbrite}`;

var categories = [];


function getCategories() {
  console.log(categories);
}

async function makeRequest() {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(JSON.stringify(body));
    categories = info.categories;
  }
  getCategories();
}

var req = request(url, { json:true }, makeRequest);

// console.log(req);

// var Schema = mongoose.Schema;
// var categorySchema = new Schema({
//   resource_uri: String,
//   id: String,
//   name: String,
//   name_localized: String,
//   short_name: String,
//   short_name_localized: String
// });
// var Category = mongoose.model('Category', categorySchema);

// var music = {
//   "resource_uri": "https://www.eventbriteapi.com/v3/categories/103/",
//   "id": "103",
//   "name": "Music",
//   "name_localized": "Music",
//   "short_name": "Music",
//   "short_name_localized": "Music"
// }

// var musicModel = new Category(music);

// console.log(musicModel);

// musicModel.save(function (err, musicModel) {
//   if (err) return console.err(err);
//   console.log('saved?');
// });

// db.collections['events.categories'].insertOne(test);

// process.exit();


