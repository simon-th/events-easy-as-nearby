const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  resource_uri: String,
  id: String,
  name: String,
  name_localized: String,
  short_name: String,
  short_name_localized: String
});

module.exports = mongoose.model('Category', CategorySchema, 'event_categories');