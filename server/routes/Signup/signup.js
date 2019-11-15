const express = require('express');
const User = require('../../mongodb_schemas/User');
const Sub = require('../../mongodb_schemas/Sub');

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
  user.saved_event = [];
  user.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// router.get('/findname', (req, res) => {
//   const { useremail } = req.body;
//   User.find({ email: useremail }, function(err, data) {
//     if (err) return res.json({ success: false, error: err });
//     console.log(res.data);
//     return res.json({ success: true, data: data });
//   });

// });

router.post('/newsub', (req, res) => {
    let sub = new Sub();
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    sub.email = email;
    sub.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

})

router.delete('/unsub', (req, res) => {
    const { email } = req.body;
    Sub.findOneAndDelete(email, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
})

router.get('/sublist', (req, res) => {
    Sub.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
})

router.get('/test', (req, res) => {
  res.send('signup api route works!');
})

module.exports = router;
