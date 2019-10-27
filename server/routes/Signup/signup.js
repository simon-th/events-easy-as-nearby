const express = require('express');
const User = require('../../mongodb_schemas/User');

const router = express.Router();

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
  user.saved_event = null;
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
