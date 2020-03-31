// const {mongoose} = require('../db/mongoose')
const {ObjectID} = require('mongodb');
// const { Team } = require('../db/teamSchema')
const {Team} = require('../db/mongoose');

const createTeamCrud = function (app) {

    /** Team resource routes **/

    app.post('/api/teams', (req, res) => {

        if (req.identity.type === 'guest') {
            // do not allow guests (unregistered users) to create teams
            throw 401;
        }
        const team = new Team({
            university: req.body.university,
            course: req.body.course,
            description: req.body.description,
            acceptNewApplications: true,
            members: req.body.members,
            quizQuestions: [],
            applications: [],
            invitations: [],
            events: []
        });

        team.save().then((result) => {
            res.send(result)
        }, (error) => {
            res.status(400).send(error)
        })
    });

    app.get('/api/teams', (req, res) => {
        Team.find().then((teams) => {
            res.send({teams})
        }, (error) => {
            res.status(500).send(error)
        })
    });

    app.get('/api/teams/:id', (req, res) => {

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

    app.delete('/api/teams/:id', (req, res) => {
        const id = req.params.id

        if (req.identity.type === 'guest') {
            // do not allow guests (unregistered users) to delete teams
            throw 401;
        }

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

    app.patch('/api/teams/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;

        if (req.identity.type === 'guest') {
            // do not allow guests (unregistered users) to modify teams
            throw 401;
        }

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

module.exports = {createTeamCrud};
