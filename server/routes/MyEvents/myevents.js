const express = require('express');
const User = require('../../mongodb_schemas/User');
const Event = require('../../mongodb_schemas/Event');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('test saved events');
});

async function getMyEvent(eventid_list) {
  var myevent = [];
  eventid_list.forEach((e) =>{
    if (e != "") {
      Event.find({id: e}, function(err, data) {
          if (data) {
            myevent.push(data[0]);
            console.log(myevent);
          }
      });
    }
  })
  return myevent
}

router.get('/savelist', async (req, res) => {
  try {
    var eventid_list = [];
    var events= [];
    const email = req.query.email;

    await User.find({ 'email': email}, 'saved_event -_id')
      .exec()
      .then(data => {
        if (data) {
          //eventid_list = JSON.stringify(data);
          eventid_list = data;
        }
        else {
          res.status(404).json({message: 'aiya'});
          console.log('er');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
      events = await getMyEvent(eventid_list[0].saved_event);
      console.log(events);
      res.status(200).json(events);
  } catch(error) {
    console.log(error);
  }
});


module.exports = router;
