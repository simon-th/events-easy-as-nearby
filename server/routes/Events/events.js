const express = require('express');
const axios = require('axios');
const Category = require('../../mongodb_schemas/Category');
const Event = require('../../mongodb_schemas/Event');
const User = require('../../mongodb_schemas/User');
const apiKeys = require('../../api-keys.json');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('events api route works!');
});

router.get('/all', async (req, res) => {
  Event.find((err, data) => {
    if (err) return res.json({
      success: false,
      error: err
    });
    return res.json({
      success: true,
      data: data
    });
  });
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
  let data = await Event.find({
    id: req.query.id
  });
  if (data) {
    res.status(200).json(data[0]);
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
  model.name = event.name;
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
  model.saved_users = 1
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
  } else {
    Event.findOneAndUpdate({"id": event_id}, {"$inc": {"saved_users": 1}}, { new: true, safe: true, upsert: true }).then((result) => {
    }).catch((error) => {
        return res.status(500).json({
            status: "Failed",
            message: "Database Error",
            data: error
        });
    });
  }

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

})

module.exports = router;