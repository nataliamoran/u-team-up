const { User } = require('../db/mongoose');

module.exports = {
    '/api/admins': {
        get: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const users = await User.find({ type: 'admin' }).select('_id');

            return users;
        },
    },

    '/api/admin': {
        get: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const admin = await User.findById(req.args.username).select('_id');

            if (! admin || admin.type !== 'admin') {
                throw 404;
            }

            return admin;
        },

        post: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const { username, password } = req.args;

            const newAdmin = new User({ username, password, type: 'admin' });

            await newAdmin.save();
            return 201;
        },

        delete: async (req, res) => {
            if (req.identity.type !== 'admin') {
                throw 401;
            }

            const { username } = req.args;

            const admin = await User.findById(username);
            if (! admin || admin.type !== 'admin') {
                throw 404;
            }

            await admin.remove();
            // 204 No Content
        },
    },

};
