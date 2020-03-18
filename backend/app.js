'use strict';

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('It works!');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
