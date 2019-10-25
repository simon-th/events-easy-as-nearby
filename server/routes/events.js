const express = require('express');
const request = require('request');
const router = express.Router();
const apiKeys = require('../api-keys.json');

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let lat = 30.2862175;
let long = -97.739388;

let url = `https://www.eventbriteapi.com/v3/events/search/\
?location.latitude=${lat}&location.longitude=${long}&location.within=2mi\
&start_date.range_start=${today.toISOString().substring(0,19) + 'Z'}\
&start_date.range_end=${tomorrow.toISOString().substring(0,19) + 'Z'}\
&token=${apiKeys.eventbrite}`;

let events = [];

function callback(error, response, body) {
  console.log('callback function called!');
  console.log(apiKeys.eventbrite);
  console.log(url);
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    events = info.events;
  }
}

// searchEventbrite = async() => {
    // request({url}, callback);
// }

router.get('/search_events', (req, res) => {
  // searchEventbrite();
  request({url}, callback);
  res.send({'test': 'successful'});
})

module.exports = router;