// From Kazakevich, M. 2020. "mongodb_express_ajax." In CSC309H1S: Programming on the Web. University of Toronto. "https://q.utoronto.ca/courses/130975/files/6450784/download?wrap=1

if (!global.uTeamUpMongooseHelper) {
    /* This module will hold our connection to
       our mongo server through the Mongoose API.
       We will access the connection in our express server. */
    const mongoose = require("mongoose");

    /* Connnect to our database */
    // Get the URI of the local database, or the one specified on deployment.
    const mongoURI =
        process.env.MONGODB_URI || "mongodb://localhost:27017/UTeamUpApp";

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    const helper = { mongoose };

    global.uTeamUpMongooseHelper = helper;

    helper.Auth = require("./auth")(mongoose);
    helper.User = require("./users")(mongoose);
    helper.Team = require("./team")(mongoose);
    helper.Profile = require("./profile")(mongoose);
    helper.Image = require("./image")(mongoose);
    helper.University = require('./university')(mongoose);
}

module.exports = {
    default: global.uTeamUpMongooseHelper.mongoose,
    ...global.uTeamUpMongooseHelper
}; // Export the active connection.
