const express = require('express');
const axios = require('axios');
const geolib = require('geolib');
const convert = require('convert-units');
const Category = require('../../mongodb_schemas/Category');
const Event = require('../../mongodb_schemas/Event');
const Restaurant = require('../../mongodb_schemas/Restaurant');
const User = require('../../mongodb_schemas/User');
const apiKeys = require('../../api-keys.json');

const router = express.Router();

async function filterRestaurantsByDistance(restaurants, source) {
  var filtered = [];
  restaurants.forEach((r) => {
    const lat = r.latitude;
    const lng = r.longitude;
    var dist = geolib.getDistance(source, {
      latitude: lat,
      longitude: lng
    });
    dist = convert(dist).from('m').to('mi');
    if (dist <= 0.5) {
      filtered.push(r);
    }
  });
  return filtered;
}

router.get('/restaurants', async (req, res) => {
  try {
    var restaurants = [];
    const lat = parseFloat(req.query.latitude);
    const lng = parseFloat(req.query.longitude);
    let data = await Restaurant.find();
    if (data) restaurants = data;
    else res.status(404).json({
      message: 'aiya'
    });
    restaurants = await filterRestaurantsByDistance(restaurants, {
      latitude: lat,
      longitude: lng
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
  }
})

router.get('/test', (req, res) => {
  res.send('events api route works!');
});

// request format
// /api/events/search/?location=30.2884957,-97.7355092&within=15&category=food&date=today

router.get('/search', async (req, res) => {
  var url = '';
  if (req.query.category === 'all') {
    url = `http://api.eventful.com/json/events/search/?app_key=${apiKeys.eventful}&location=${req.query.location}&within=${req.query.within}&date=${req.query.date}&page_size=50&sort_order=popularity`;
  } else {
    url = `http://api.eventful.com/json/events/search/?app_key=${apiKeys.eventful}&location=${req.query.location}&within=${req.query.within}&category=${req.query.category}&date=${req.query.date}&page_size=50&sort_order=popularity`;
  }
  var response = await axios.get(url).catch(function (error) {
    console.log(error.message);
  });
  // console.log(response);
  return res.status(200).json(response.data.events.event);
});

router.get('/categories', async (req, res) => {
  let data = await Category.find();
  if (data) {
    res.status(200).json(data);
  } else res.status(404).json({
    message: 'aiya'
  });
});

router.get('/', async (req, res) => {
  let data = await Event.find();
  // console.log(data);
  if (data) {
    res.status(200).json(data);
  } else res.status(404).json({
    message: 'aiya'
  });
});

router.get('/category', async (req, res) => {
  let data = await Category.find({
    id: req.query.id
  });
  if (data) {
    res.status(200).json(data);
  } else res.status(404).json({
    message: 'aiya'
  });
});

function getNewEvent(event) {
  model = new Event();
  model.name = event.title;
  model.description = event.description;
  model.id = event.id;
  model.url = event.url;
  model.start_time = event.start_time;
  model.end_time = event.stop_time;
  model.latitude = event.latitude;
  model.longitude = event.longitude;
  model.venue_name = event.venue_name;
  model.venue_address = event.venue_address;
  model.city = event.city_name;
  model.region = event.region_name;
  model.postal_code = event.postal_code;
  model.image_url = null;
  if (event.image != null) {
    model.image_url = event.image.medium.url;
  }
  model.saved_users = []
  return model;
}

router.post('/save', async (req, res) => {
  const { email, event_id } = req.body;
  let db_event = await Event.find({
    id: event_id
  });
  if (db_event.length == 0) {
    var API_URL = `http://api.eventful.com/json/events/get/?app_key=${apiKeys.eventful}&id=${event_id}`;
    var response = await axios.get(API_URL).catch(function (error) {
      console.log(error.message);
    });
    const event = JSON.parse(JSON.stringify(response.data));
    model = getNewEvent(event);
    await model.save();
    console.log('Created event in db');
  } else if (db_event[0].saved_users.includes(email)) {
    return res.status(500).json({
      status: "Failed",
      message: "Cannot Save Twice",
      data: null
    });
  }
  Event.findOneAndUpdate({"id": event_id}, {"$push": {"saved_users": email}}, { new: true, safe: true, upsert: true }).then((result) => {
    let saved_event = new User();
    saved_event.email = email;
    saved_event.event_id = event_id;
    console.log(saved_event.email);
    console.log(saved_event.event_id);
    User.findOneAndUpdate({"email": saved_event.email}, {"$push": {"saved_event": saved_event.event_id}}, { new: true, safe: true, upsert: true }).then((result) => {
        return res.status(201).json({
          status: "Success",
          message: "Resources Are Created Successfully",
          data: result
        });
      }).catch((error) => {
        return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: error
        });
      });
    }).catch((error) => {
      return res.status(500).json({
        status: "Failed",
        message: "Database Error",
        data: error
      });
    });
})

module.exports = router;