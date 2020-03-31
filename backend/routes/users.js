const { mongoose, Profile, User, Auth, Team } = require('../db/mongoose');
const { validCriteria } = require('../helper/filter');
const debug = console.log;

module.exports = {
    '/api/user': {
        get: async (req, res) => {
            const user = await Profile.findById(req.args.username);
            if (!user) {
                throw 404;
            } else {
                return user;
            }
        },
        put: async (req, res) => {
            if (req.identity.type !== 'admin'
                && req.identity.username !== req.args.username) {
                // do not allow users to modify others' profile
                throw 401;
            }

            // now it is authorized
            const user = await Profile.findById(req.args.username);
            if (! user) {
                throw 404;
            }

            console.log('user profile:', user);
            console.log(req.args);

            Object.keys(req.args)
            // do not allow to change id
                .filter(k => k !== 'username' && k !== '_id')
                .forEach(k => user[k] = req.args[k]);

            console.log('new user profile:', user);
            await user.save();
            console.log('new user profile after save:', user);

            return user;
        },
        delete: async (req, res) => {
            // TODO authorize user to delete their own account
            debug(req.identity.type);
            if (req.identity.type !== 'admin'
                /* && req.identity.uid !== req.args.id */) {
                throw 401;
            }

            const username = req.args.username;

            const user = await User.findById(username);
            if (! user) {
                throw 404;
            }
            await user.remove();
            await Profile.findByIdAndRemove(id);
            await Auth.deleteMany({ username });
            const teams = await Team.updateMany(
                { members: username }, { members: { $pull: username } });

            return 200;
        },
    },

    '/api/users': {
        // https://github.com/Automattic/mongoose/issues/6427
        get: async (req, res) =>
            await Profile.find(
                Profile.translateAliases(validCriteria(req.args))),
    },
};
