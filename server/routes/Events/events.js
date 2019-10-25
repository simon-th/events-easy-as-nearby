const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Category = require('../../mongodb_schemas/Category');
const Event = require('../../mongodb_schemas/Event');


const router = express.Router();

const DATABASE_NAME = 'events';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.once('open', () => {
  dbConnected = true;
  console.log('connected to database');
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

router.get('/test', (req, res) => {
  res.send('events api route works!');
});

router.get('/category', (req, res) => {
  Category.find({ id: req.query.id }, (err, data) => {
    if (err) return res.json({ success: false, error: err});
    return res.json({ success: true, data: data});
  });
});

// axios.get('/filter/?f1=104&f2=107&f3=120')

router.get('/filter', (req, res) => {
  var events = []
  // for (var i = 1; i < 21; i++) {
  var i = 1;
  var key = `f${i}`;
  if (req.query[key]) {
    // console.log(req.query[key]);
    Event.find({ category_id: req.query[key] }, (err, data) => {
      if (err) return res.json({ success: false, error: err});
      return res.json({ success: true, data: data});
    });
  }
    // console.log(filters[i]);
  // }
  res.send(events);
});


module.exports = router;