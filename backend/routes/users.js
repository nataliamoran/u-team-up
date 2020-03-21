const { Profile } = require('../db/mongoose');

module.exports = {
    '/user': {
        get: async (req, res) => {
            const user = await Profile.findById(req.args.id).exec();
            if (!user) {
                throw 404;
            } else {
                return user;
            }
        },
        put: async (req, res) => {
            if (req.identity.type !== 'admin'
                && req.identity.uid !== req.args.id) {
                // do not allow users to modify others' profile
                throw 401;
            }

            // now it is authorized
            const user = (await Profile.findById(req.args.id).then())
                  || new Profile({ _id: req.args.id });
            console.log('user profile:', user);
            console.log(req.args);
            Object.keys(req.args)
            // do not allow to change id
                .filter(k => k !== 'id' && k !== '_id')
                .forEach(k => user[k] = req.args[k]);

            console.log('new user profile:', user);
            await user.save();
            console.log('new user profile after save:', user);

            return user;
        },
    },
    '/users': {
        get: async (req, res) =>
            await Profile.find().exec(),
    },
};
