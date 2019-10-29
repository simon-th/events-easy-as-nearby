const express = require('express');
const Event = require('../../mongodb_schemas/Event');
const router = express.Router();

router.get('/geteventlist', (req, res) => {
  Event.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('*', (req, res) => {
    res.send('testingexplore');
})



module.exports = router;
