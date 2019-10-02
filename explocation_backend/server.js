const express = require('express');
const bodyParser = require('body-parser');
//const pino = require('express-pino-logger')();
var cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(pino);
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/backend', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND IS CONNECTED TO EXPLOCATION' });
});

app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message
  });
  res.send('Thanks for your message!');
});
