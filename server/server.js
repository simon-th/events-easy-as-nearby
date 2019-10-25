//const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = 3001;
const app = express();
app.use(cors());
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.use('/explore', require('./routes/Explore/explore'));
//router.use('/signup', require('./routes/Signup/signup'));

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
