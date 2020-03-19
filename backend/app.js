'use strict';

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// combine params, query and/or body into args
app.use(require('./middleware/args'));

app.use(require('./middleware/auth'));

const wrap = require('./helper/response-wrapper');

app.get('/', wrap((req, res) => 'It works!'));

app.use(wrap(async () => { throw 404; }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
