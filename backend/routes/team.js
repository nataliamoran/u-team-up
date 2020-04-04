const { ObjectID } = require('mongodb');

const { Team, Profile } = require('../db/mongoose');

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
            members: req.identity.type === "user" ? [req.identity.username] : [],
            quizQuestions: [
                "Which grade are you aiming for?",
                "Will you be able to attend weekly team meetings on campus?",
                "How many hours per week will you be working on the project?"
            ],
            applications: [],
            invitations: [],
            events: []
        });

        team.save().then(async (result) => {
            if(req.identity.type === "user"){
                const profile = await Profile.findById(req.identity.username);

                profile.teams.push(team._id);

                return profile.save().then(() => {
                    res.status(201).send(result);
                });
            } else {
                return res.status(201).send(result);
            }
        })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
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

        Team.findById(id).then(async (team) => {
            if (!team) {
                res.status(404).send();
            } else {
                const members = team.members;
                members.map( async (member) => {
                    const profile = await Profile.findById(member);
                    profile.teams = profile.teams.filter(team => team != id);
                    profile.save().then(() => {
                        // return res.status(204).send();
                    });

                });

                Team.deleteOne({_id: id}).then(() => {
                    return res.status(204).send();
                });
            }
        }).catch((error) => {
            res.status(500).send(error)
        });
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
