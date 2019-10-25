const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  summary: String,
  description: String,
  id: String,
  url: String,
  category_id: String,
  start: {
    timezone: String,
    local: String,
    utc: String
  },
  end: {
    timezone: String,
    local: String,
    utc: String
  },
  latitude: String,
  longitude: String,
  venue_address: {
    address_1: String,
    address_2: String,
    city: String,
    region: String,
    postal_code: String,
    country: String,
  },
  venue_name: String
});

module.exports = mongoose.model('Event', EventSchema, 'event_info');