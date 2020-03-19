'use strict';

const teamModel = require('./models/team');
const {mongoose} = require('./db/global.uTeamUpMongooseHelper.mongoose');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// combine params, query and/or body into args
app.use(require('./middleware/args'));

app.use(require('./middleware/auth'));

// cors middleware
const cors = require('cors');
app.use(cors());

// create CRUD for Team
teamModel.createTeamCrud(app);

// test
app.get('/', (req, res) => {
    res.send('It works!');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
