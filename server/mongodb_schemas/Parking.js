const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
  latitude: Number,
  longitude: Number,
  address: String,
});

module.exports = mongoose.model('Parking', ParkingSchema, 'parking_info');