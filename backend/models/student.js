const { mongoose } = require("../db/mongoose");
const { ObjectID } = require("mongodb");

const Student = mongoose.model("Student", {
    name: {
        type: String,
        minlength: 1,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlegth: 1,
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    }
    university: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    yearOfStudy: {
        type: Number
    }
});

const studentCrud = function(app) {
    // Create a student
    app.post("/students", (req, res) => {
        const student = new Student({
            username: req.body.username,
            email: req.body.email,
            university: req.body.university,
            password: req.body.password
        });

        student.save().then(
            result => {
                res.send(result);
            },
            error => {
                res.status(400).send(error);
            }
        );
    });

    // Get all students
    app.get("/students", (req, res) => {
        Student.find().then(
            students => {
                res.send({ students });
            },
            error => {
                res.status(500).send(error);
            }
        );
    });

    // Get a student by their id
    app.get("/students/:id", (req, res) => {
        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
            return;
        }

        Student.findById(id)
            .then(student => {
                if (!student) {
                    res.status(404).send(); // could not find this student
                } else {
                    res.send(student);
                }
            })
            .catch(error => {
                res.status(500).send();
            });

        // Remove a student by their id
        app.delete("/students/:id", (req, res) => {
            const id = req.params.id;

            if (!ObjectID.isValid(id)) {
                res.status(404).send();
                return;
            }

            Student.findByIdAndRemove(id)
                .then(student => {
                    if (!student) {
                        res.status(404).send();
                    } else {
                        res.send(student);
                    }
                })
                .catch(error => {
                    res.status(500).send();
                });
        });

        // Change properties
        app.patch("/students/:id", (req, res) => {
            const id = req.params.id;

            // get updated name, email, university
            const { name, email, university, password } = req.body;
            const body = { name, email, university, password };

            if (!ObjectID.isValid(id)) {
                res.status(404).send();
                return;
            }

            Student.findByIdAndUpdate(id, { $set: body }, { new: true })
                .then(student => {
                    if (!student) {
                        res.status(404).send();
                    } else {
                        res.send(student);
                    }
                })
                .catch(error => {
                    res.status(400).send();
                });
        });
    });
};

module.exports = { Student, studentCrud };
