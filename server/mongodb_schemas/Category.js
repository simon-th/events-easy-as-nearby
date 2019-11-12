const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('Category', CategorySchema, 'event_categories');