require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //if extend is false I cannot post nedted object

// dotenv library let us to use variables from .env file
require('dotenv').config();

app.use((Req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    next();
});

//app frontend will send request to this route
app.post('/paint', (req, res) => {
    pusher.trigger('painting', 'drwa', req.body);
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`server is working on port ${ port }`);
});

