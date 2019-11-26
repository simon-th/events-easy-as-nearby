const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
var CronJob = require('cron').CronJob;
const path = require("path");
const apiKeys = require('./api-keys.json');
const Restaurant = require('./mongodb_schemas/Restaurant');
const circles = require('./scripts/circle-list');
const Event = require('./mongodb_schemas/Event')
const eventIds = require('./scripts/event-list');
const Sub = require('./mongodb_schemas/Sub');
var nodemailer = require('nodemailer');

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.once('open', () => {
  dbConnected = true;
  console.log('connected to database from server.js');
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

const API_PORT = 8080;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/events', require('./routes/events'));
app.use('/api/signup', require('./routes/signup'));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'myblog12345ee461l@gmail.com',
    pass: 'Huyql2301'
  }
});

new CronJob('00 00 1 * * 7', async function() {
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

}, null, true, 'America/Chicago');

new CronJob('00 00 01 * * *', async function() {
  var changes = [];
  var emails = await Sub.find();
  async function getChanges() {
    var events = await Event.find().catch((error) => {
      console.log(error);
      return;
    })
    events.forEach(async dbEvent => {
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
    if (changes.length == 0) return;
    for (var i = 0; i < changes.length; i++) {
        let filter = {id : changes[i].id};
        let update = {start_time: changes[i].start_time,
                      end_time: changes[i].end_time,
                      venue_address: changes[i].venue_address};
        Event.findOneAndUpdate(filter, update);

        var noti = [];
        let ev = await Event.findOne(filter);
        for (const e of ev.saved_users) {
          if (emails.includes(e)) noti.push(e);
        }

        if (noti.length > 0) {
          var mailOptions = {
            from: 'myblog12345ee461l@gmail.com',
            to: noti,
            subject: 'Event changes',
            html: '<h2>Thank you for subcribing to Explocation. The following event that you saved has been changed</h2>' + '<h4>Here are the changes:</h4>' + '<p>' + ev.name + '</p>' + '<p>' + changes[i].venue_address + '</p>' + '<p>' + changes[i].start_time + '-' + changes[i].end_time + '</p>' + '<p>From team Tiger with love</p>',
          };

          await transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
          });
        }
    }
  }

  async function main() {
    await getChanges();
    await updateEvents();
    process.exit();
  }

}, null, true, 'America/Chicago');

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
