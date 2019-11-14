const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  address: String,
  price_level: Number,
  rating: Number,
  num_ratings: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema, 'restaurant_info');