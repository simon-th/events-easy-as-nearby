const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const DATABASE_NAME = 'events';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
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
// var signupRouter = express.Router();
// var eventRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

// signupRouter.use(require('./routes/Signup/signup'));
// eventRouter.use(require('./routes/Events/events'));

app.use('/events', require('./routes/Events/events'));
app.use('/signup', require('./routes/Signup/signup'));

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
