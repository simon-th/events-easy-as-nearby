const express = require('express');
const axios = require('axios');
const geolib = require('geolib');
const convert = require('convert-units');
const Category = require('../mongodb_schemas/Category');
const Event = require('../mongodb_schemas/Event');
const Restaurant = require('../mongodb_schemas/Restaurant');
const User = require('../mongodb_schemas/User');
const apiKeys = require('../api-keys.json');
const utils = require('../utils');

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
    var data = await Restaurant.find();
    if (data == null) {
      return res.status(404).json(utils.getError('Database error: Restaurants not found.', error));
    };
    const lat = parseFloat(req.query.latitude);
    const lng = parseFloat(req.query.longitude);
    const filteredRestaurants = await filterRestaurantsByDistance(data, { latitude: lat, longitude: lng });
    return res.status(200).json(utils.getSuccess('Restaurants successfully returned.', filteredRestaurants));
  } catch(error) {
    return res.status(500).json(utils.getError('Error', error));
  }
})

router.get('/savelist', async (req, res) => {
  try {
    const email = req.query.email;
    var data = await User.find({ email: email });
    if (data == null || data.length == 0) {
      res.status(404).json(utils.getError('Database error: User email not found.'));
    }
    var savedEvents = data[0].saved_event;
    var events = await Event.find({ id: {$in: savedEvents}});
    return res.status(200).json(utils.getSuccess('Saved event list successfully returned.', events));
  } catch(error) {
    return res.status(500).json(utils.getError('Error', error));
  }
});

router.get('/test', (req, res) => {
  res.send('events api route works!');
});

// request format
// /api/events/search/?location=30.2884957,-97.7355092&within=15&category=food&date=today

router.get('/search', async (req, res) => {
  var url = `http://api.eventful.com/json/events/search/?app_key=${apiKeys.eventful}&location=${req.query.location}&within=${req.query.within}&date=${req.query.date}&page_size=50&sort_order=date`;
  if (req.query.category !== 'all') {
    url += `&category=${req.query.category}`;
  }
  console.log(url);
  var response = await axios.get(url).catch((error) => {
    return res.status(500).json(utils.getError('API call error', error));
  });
  return res.status(200).json(utils.getSuccess('Event list successfully returned.', response.data.events.event));
});

router.get('/categories', async (req, res) => {
  var data = await Category.find();
  if (data == null) res.status(500).json(utils.getError('Database error.', null));
  res.status(200).json(utils.getSuccess('Categories returned successfully.', data));
});

router.get('/', async (req, res) => {
  var data = await Event.find();
  if (data == null) res.status(500).json(utils.getError('Database error.', null));
  res.status(200).json(utils.getSuccess('Events returned successfully.', data));
});

router.get('/category', async (req, res) => {
  var data = await Category.find({ id: req.query.id });
  if (data == null) res.status(500).json(utils.getError('Database error.', null));
  if (data.length === 0) res.status(404).json(utils.getError('Category not found.', null));
  res.status(200).json(utils.getSuccess('Category returned successfully.', data));
});

function getNewEvent(event) {
  model = new Event({
    name: event.title,
    description: event.description,
    id: event.id,
    url: event.url,
    start_time: event.start_time,
    end_time: event.stop_time,
    latitude: event.latitude,
    longitude: event.longitude,
    venue_name: event.venue_name,
    venue_address: event.venue_address,
    city: event.city_name,
    region: event.region_name,
    postal_code: event.postal_code,
    images: event.images,
    saved_users: []
  });
  return model;
}

router.post('/unsave', async (req, res) => {
  const { email, event_id } = req.body;
  await Event.findOneAndUpdate({"id": event_id}, {"$pull": {"saved_users": email}}, { new: true, safe: true, upsert: true }).catch((error) => {
    return res.status(500).json(utils.getError('Database Error: Error updating event.', error));
  });

  await Event.findOneAndRemove({"saved_users": []}).catch((error) => {
    return res.status(500).json(utils.getError('Database Error: Error removing event.', error));
  });

  const result = await User.findOneAndUpdate({"email": email}, {"$pull": {"saved_event": event_id}}, { new: true, safe: true, upsert: true }).catch((error) => {
    return res.status(500).json(utils.getError('Database Error: Error updating user.', error));
  });

  return res.status(201).json(utils.getSuccess('Event unsaved successfully.', result));
})

router.post('/save', async (req, res) => {
  const { email, event_id } = req.body;
  let db_event = await Event.find({ id: event_id });

  if (db_event.length === 0) {
    var API_URL = `http://api.eventful.com/json/events/get/?app_key=${apiKeys.eventful}&id=${event_id}`;
    var response = await axios.get(API_URL).catch((error) => {
      return res.status(500).json(utils.getError('API Error.', error));
    });
    const event = JSON.parse(JSON.stringify(response.data));
    model = getNewEvent(event);
    await model.save();
  } else if (db_event[0].saved_users.includes(email)) {
    return res.status(500).json(utils.getError('Error: Cannot save event twice.', null));
  }

  await Event.findOneAndUpdate({"id": event_id}, {"$push": {"saved_users": email}}, { new: true, safe: true, upsert: true }).catch((error) => {
    return res.status(500).json(utils.getError('Database Error: Error updating event.', error));
  });

  const result = await User.findOneAndUpdate({"email": email}, {"$push": {"saved_event": event_id}}, { new: true, safe: true, upsert: true }).catch((error) => {
    return res.status(500).json(utils.getError('Database Error: Error updating user.', error));
  });

  return res.status(201).json(utils.getSuccess('Event saved successfully.', result));
})

module.exports = router;
