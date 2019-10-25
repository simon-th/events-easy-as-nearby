const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

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
