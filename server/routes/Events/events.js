const express = require('express');
const geolib = require('geolib');
const convert = require('convert-units');
const Category = require('../../mongodb_schemas/Category');
const Event = require('../../mongodb_schemas/Event');

const router = express.Router();

async function filterEventsByDistance(events, source, distance) {
  var filteredEvents = [];
  events.forEach((e) => {
    var d = geolib.getDistance(source, {
      latitude: e.latitude,
      longitude: e.longitude
    });
    d = convert(d).from('m').to('mi');
    if (d <= distance) {
      filteredEvents.push(e);
    }
  });
  return filteredEvents;
}

router.get('/test', (req, res) => {
  res.send('events api route works!');
});

router.get('/category', async (req, res) => {
  await Category.find({ id: req.query.id})
    .exec()
    .then(data => {
      // console.log(data);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'aiya'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  });

router.get('/filter', async (req, res) => {
  try {
    var events = [];
    var isFilter = false;
    for (var i = 1; i < 21; i++) {
    // var i = 1;
      var key = `f${i}`;
      if (req.query[key]) {
        isFilter = true;
        const id = req.query[key];
        await Event.find({ 'category_id': id})
        .exec()
        .then(data => {
          if (data) events = events.concat(data);
          else res.status(404).json({message: 'aiya'});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({error: err});
        });
      } else {
        if (!isFilter) {
          await Event.find()
          .exec()
          .then(data => {
            if (data) events = data;
            else res.status(404).json({message: 'aiya'});
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });
        }
        break;
      }
    }
    const distance = req.query.distance;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    var filteredEvents = await filterEventsByDistance(events, {latitude: latitude, longitude: longitude}, distance);
    res.status(200).json(filteredEvents);
  } catch(error) {
    console.log(error);
  }
});


module.exports = router;