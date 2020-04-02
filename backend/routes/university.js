const { ObjectID } = require('mongodb');
const { mongoose, University } = require('../db/mongoose');
const { validCriteria } = require('../helper/filter');

const debug = console.log;

const findUnivCourse = async ({ university, course }) => {
    if (! ObjectID.isValid(university)
        || ! ObjectID.isValid(course)) {
        return [];
    }

    const univ = await University.findById(university);
    if (! univ) { return []; }

    const c = await univ.courses.id(course);
    return [univ, c];
};

module.exports = {
    '/api/university': {
        get: async (req, res) => {
            const id = req.args.id;

            if (! ObjectID.isValid(id)) {
                throw 404;
            }

            const univ = await University.findById(id);
            if (! univ) {
                throw 404;
            }

            return univ;
        },

        post: async (req, res) => {
            req.identity.username; // do not allow guests

            const name = req.args.name;

            const univ = new University({ name });
            await univ.save();

            return { _code: 201, _result: univ };
        },

        delete: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const id = req.args.id;

            if (! ObjectID.isValid(id)) {
                throw 404;
            }

            try {
                await University.findByIdAndRemove(id);
            } catch (_) {
                throw 404;
            }

            return;
        },
    },

    '/api/university/course': {
        get: async (req, res) => {
            const [, course] = await findUnivCourse(req.args);

            if (!course) { throw 404; }

            return course;
        },

        post: async (req, res) => {
            req.identity.username; // do not allow guests

            const { university, title, code } = req.args;

            if (! ObjectID.isValid(university)) {
                throw 404;
            }

            const univ = await University.findById(university);
            if (! univ) { throw 404; }

            univ.courses.push({ title, code });
            await univ.save();

            return { _code: 201,
                     _result: (univ.courses[univ.courses.length - 1]) };
        },

        put: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const [univ, course] = await findUnivCourse(req.args);
            if (! course) { throw 404; }

            ['code', 'title']
                .forEach(n => (n in req.args)
                         && (course[n] = req.args[n]));
            await univ.save();

            return;
        },

        delete: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const [univ, course] = await findUnivCourse(req.args);
            if (! course) { throw 404; }

            course.remove();

            await univ.save();

            return;
        },
    },
};
