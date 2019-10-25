const mongoose = require('mongoose');
//require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./data');

const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.post('/newuser', (req, res) => {
  let user = new User();

  const { username, email } = req.body;

  if (!username || !email) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  user.username = username;
  user.email = email;
  user.saved_event = "";
  user.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/findname', (req, res) => {
  const { useremail } = req.body;
  User.find({ email: useremail }, function(err, data) {
    if (err) return res.json({ success: false, error: err });
    console.log(res.data);
    return res.json({ success: true, data: data });
  });

});

router.get('/test', (req, res) => {
  res.send('signup api route works!');
})

module.exports = router;
