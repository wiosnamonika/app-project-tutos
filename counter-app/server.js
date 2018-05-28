const express = require('express');
const path = require('path');
const Pusher = require('pusher');
const app = express();
app.use(express.static(path.join(__dirname)));

 // Initialise

const pusher = new Pusher({
  appId: '531491',
  key: '2f87c4ea4419adfd896c',
  secret: 'c5978bac240ea630a611',
  cluster: 'eu',
  encrypted: true
});

 // routes and reponses

app.get('/', (req,res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/vote', (req, res) => {
  let item = req.query.item_id;
  pusher.trigger('counter', 'vote', {item: item});
  res.status(200).send();
});

//define pport
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});