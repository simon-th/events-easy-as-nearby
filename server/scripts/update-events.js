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

var changes = [];

async function getChanges() {
  var events = await Event.find().catch((error) => {
    console.log(error);
    return;
  })
  events.forEach(dbEvent => {
    // search eventful API with event ID
    const apiEvent = await axios.get(`http://api.eventful.com/json/events/get/?app_key=${apiKeys.eventful}&id=${dbEvent.id}`);
    // check for changes
    const startTimeChange = !(apiEvent.start_time === dbEvent.start_time);
    const endTimeChange = !(apiEvent.stop_time === dbEvent.end_time);
    const venueChange = !(apiEvent.venue_address === dbEvent.venue_address);
    var change = {
      id: apiEvent.id,
      start_time: dbEvent.start_time,
      end_time: dbEvent.end_time,
      venue_address: dbEvent.venue_address,
    };
    if (startTimeChange) change.start_time = apiEvent.start_time;
    if (endTimeChange) change.end_time = apiEvent.stop_time;
    if (venueChange) change.venue_address = apiEvent.venue_address;
    // if any changes, update event on databasae
    if (startTimeChange || endTimeChange || venueChange) {
      changes.push(change);
    }
  });
}

async function updateEvents() {

}

async function main() {
  // await waitDb();
  await getChanges();
  await storeEvents();
  process.exit();
}

var main = main();
