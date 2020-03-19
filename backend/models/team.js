const {mongoose} = require('../db/global.uTeamUpMongooseHelper.mongoose')
const { ObjectID } = require('mongodb')

const Team = mongoose.model('Team', {
    _id: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    university: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    course: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
});

const createTeamCrud = function (app) {

    /** Team resource routes **/

    app.post('/teams', (req, res) => {

        const team = new Team({
            _id: req.body._id,
            university: req.body.university,
            course: req.body.course,
            description: req.body.description
        });

        team.save().then((result) => {
            res.send(result)
        }, (error) => {
            res.status(400).send(error)
        })
    });

    app.get('/teams', (req, res) => {
        Team.find().then((teams) => {
            res.send({teams})
        }, (error) => {
            res.status(500).send(error)
        })
    });

    app.get('/teams/:id', (req, res) => {

        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
            return;
        }

        Team.findById(id).then((team) => {
            if (!team) {
                res.status(404).send();
            } else {
                res.send(team)
            }
        }).catch((error) => {
            res.status(500).send(error)
        })

    });

    app.delete('/teams/:id', (req, res) => {
        const id = req.params.id

        if (!ObjectID.isValid(id)) {
            res.status(404).send()
            return;
        }

        Team.findByIdAndRemove(id).then((team) => {
            if (!team) {
                res.status(404).send()
            } else {
                res.send(team)
            }
        }).catch((error) => {
            res.status(500).send(error)
        })
    });

    app.patch('/teams/:id', (req, res) => {
        const id = req.params.id;

        const {university, course, description} = req.body;
        const body = {university, course, description};

        if (!ObjectID.isValid(id)) {
            res.status(404).send()
            return;
        }

        Team.findByIdAndUpdate(id, {$set: body}, {new: true}).then((team) => {
            if (!team) {
                res.status(404).send()
            } else {
                res.send(team)
            }
        }).catch((error) => {
            res.status(400).send(error)
        })

    })
};

module.exports = {Team, createTeamCrud};
