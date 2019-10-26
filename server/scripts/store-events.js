// Script to store all events within certain distance and time period in the MongoDB database

const axios = require('axios');
const apiKeys = require('../api-keys.json');
const mongoose = require('mongoose');
const Event = require('../mongodb_schemas/Event')
const eventIds = require('./event-list');

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

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

var events = [];

async function getVenue(URL) {
  var response = await axios.get(URL).catch(function (error) {
    console.log(error.message);
  });
  console.log(response);
}

async function storeEvents() {
  for (var i = 0; i < events.length; i ++) {
    var model = new Event();
    const event = events[i];
    model.name = event.name.text;
    model.summary = event.summary;
    model.description = event.description.text;
    model.id = event.id;
    model.url = event.url;
    model.category_id = event.category_id;
    model.start_time = event.start.utc;
    model.end_time = event.end.utc;
    model.is_free = event.is_free;
    if (event.logo != null) model.image_url = event.logo.url;
    else model.image_url = null;
    var venueId = event.venue_id;
    var VENUE_URL = `https://www.eventbriteapi.com/v3/venues/${venueId}/?token=${apiKeys.eventbrite}`;
    var response = await axios.get(VENUE_URL).catch(function (error) {
      console.log(error.message);
    });
    const venue = JSON.parse(JSON.stringify(response.data));
    model.latitude = venue.latitude;
    model.longitude = venue.longitude;
    model.venue_address = {};
    model.venue_address.address_1 = venue.address.address_1;
    model.venue_address.address_2 = venue.address.address_2;
    model.venue_address.city = venue.address.city;
    model.venue_address.region = venue.address.region;
    model.venue_address.postal_code = venue.address.postal_code;
    model.venue_address.country = venue.address.country;
    model.venue_name = venue.name;
    await model.save();
    console.log(`${i} stored ${model.name}`);
  }
  console.log('stored events');
}

async function getEvents() {
  for (var i = 0; i < eventIds.length; i ++) {
    const eventId = eventIds[i];
    const EVENTBRITE_URL = `https://www.eventbriteapi.com/v3/events/${eventId}/?token=${apiKeys.eventbrite}`;
    var response = await axios.get(EVENTBRITE_URL).catch(function (error) {
      console.log(error.message);
    });
    const info = JSON.parse(JSON.stringify(response.data));
    events.push(info);
    console.log(`${i} received ${info.name.text}`)
  }
  console.log('got events');
}

// async function waitDb() {
  //   while (!dbConnected);
  //   console.log('connected to database');
  // }

async function main() {
  // await waitDb();
  await getEvents();
  await storeEvents();
  process.exit();
}

var main = main();
