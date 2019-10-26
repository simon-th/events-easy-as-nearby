const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const path = require("path");

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.once('open', () => {
  dbConnected = true;
  console.log('connected to database from server.js');
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

const API_PORT = 3001;
const app = express();
app.use(cors());
//app.use(express.static(__dirname + "./public"));
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/events', require('./routes/Events/events'));
app.use('/signup', require('./routes/Signup/signup'));
app.use('/explore', require('./routes/Explore/explore'));
app.use('/savedevent', require('./routes/SavedEvent/savedevent'));
app.use('/myevents', require('./routes/MyEvents/myevents'));

app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname,"../client/build/index.html"));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
