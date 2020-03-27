const { mongoose, Profile, User, Auth, Team } = require("../db/mongoose");

// create a profile
app.post("/api/profiles", (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        year: req.body.year
    });

    profile.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
});

// get profile by username
app.get("api/profiles/:username", (req, res) => {
    const username = req.params.username;

    if (!ObjectID.isValid(username)) {
        res.status(404).send();
        return;
    }

    Profile.findById(username)
        .then(profile => {
            if (!profile) {
                res.status(404).send();
            } else {
                res.send({ profile });
            }
        })
        .catch(error => {
            res.status(500).send();
        });
});

// update profile by id/username
app.patch("api/profiles/:username", (req, res) => {
    const username = req.params.username;

    const {
        image,
        fullname,
        university,
        year,
        major,
        coursesTaken,
        currentCourses,
        teams,
        reviews,
        description,
        email,
        location,
        gpa,
        pastProject,
        experience
    } = req.body;

    const body = {
        image,
        fullname,
        university,
        year,
        major,
        coursesTaken,
        currentCourses,
        teams,
        reviews,
        description,
        email,
        location,
        gpa,
        pastProject,
        experience
    };

    if (!ObjectID.isValid(username)) {
        res.status(404).send();
        return;
    }

    Profile.findByIdAndUpdate(username, { $set: body }, { new: true })
        .then(profile => {
            if (!profile) {
                res.status(404).send();
            } else {
                res.send(profile);
            }
        })
        .catch(error => {
            res.status(400).send();
        });
});
