const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  description: String,
  id: String,
  url: String,
  start_time: String,
  end_time: String,
  latitude: String,
  longitude: String,
  venue_name: String,
  venue_address: String,
  city: String,
  region: String,
  postal_code: String,
  image_url: String,
  saved_users: Number
});

module.exports = mongoose.model('Event', EventSchema, 'event_info');