'use strict';

const team = require('./routes/team');
const image = require('./routes/image')
// const {mongoose} = require('./db/mongoose');
// const {mongoose} = require('./db/global.uTeamUpMongooseHelper.mongoose');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cors middleware
const cors = require('cors');
app.use(cors());

// combine params, query and/or body into args
app.use(require('./middleware/args'));

app.use(require('./middleware/auth'));

const rh = require('./helper/route-helper');
const wrap = require('./helper/response-wrapper');

// image API routes
image.createImageCrud(app);

// create CRUD for Team
team.createTeamCrud(app);

app.get('/', wrap((req, res) => 'It works!'));

rh(app, require('./routes/users'));

app.use(wrap(async () => { throw 404; }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
