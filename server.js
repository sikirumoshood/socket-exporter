const express = require('express');
const bodyParser = require('body-parser');
const socket = require('./server/socket');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({success: true});
});

const server = app.listen(3000, () => { console.log('Server running on port: ', 3000); });

socket(server);