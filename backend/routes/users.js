const {mongoose, Profile, User, Auth, Team} = require('../db/mongoose');
const {validCriteria} = require('../helper/filter');
const debug = console.log;

module.exports = {
    '/api/user': {
        get: async (req, res) => {
            const user = await Profile.findById(req.args.username).select('-messages');
            if (!user) {
                throw 404;
            } else {
                return user;
            }
        },
        put: async (req, res) => {
            if (req.identity.type !== 'admin'
                && req.identity.username !== req.args.username
                && !req.body.applications
                && !req.body.event
                && !req.body.teamMembershipUpdate
                && !req.body.teams) {
                // do not allow users to modify others' profile
                throw 401;
            }

            // now it is authorized
            const user = await Profile.findById(req.args.username);
            if (!user) {
                throw 404;
            }

            console.log('user profile:', user);
            console.log(req.args);

            Object.keys(req.args)
                // do not allow to change id
                .filter(k => k !== 'username' && k !== '_id')
                .forEach(k => user[k] = req.args[k]);


            if(req.body.events){
                user["messages"].push({
                    teamUniversity: req.body.teamUniversity,
                    teamCourse: req.body.teamCourse,
                    messageText: "New team event is scheduled.",
                    event: req.body.event
                })
            } else if(req.body.applications || req.body.teamMembershipUpdate){
                let messageText;
                if (req.body.applications){
                    if(req.body.applicationStatus.toLowerCase() === "accepted"){
                        messageText = "Congratulations! Your application was accepted."
                    } else if(req.body.applicationStatus.toLowerCase() === "rejected"){
                        messageText = "Sorry, your application was rejected."
                    } else {
                        messageText = "Your application is successfully submitted."
                    }
                } else {
                    if(req.body.teamMembershipUpdate.toLowerCase() === 'added'){
                        messageText = "You were added to the team."
                    } else {
                        messageText = "You were removed from the team."
                    }
                }
                user["messages"].push({
                    teamUniversity: req.body.teamUniversity,
                    teamCourse: req.body.teamCourse,
                    messageText: messageText
                })
            }



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
            if (!user) {
                throw 404;
            }
            await user.remove();
            await Profile.findByIdAndRemove(username);
            await Auth.deleteMany({username});
            const teams = await Team.updateMany(
                {members: username}, {members: {$pull: username}});

            return 200;
        },
    },

    '/api/users': {
        // https://github.com/Automattic/mongoose/issues/6427
        get: async (req, res) =>
            await Profile.find(
                Profile.translateAliases(validCriteria(req.args))),
    },

    '/api/user/messages': {
        get: async (req, res) => {
            if (req.identity.type !== 'user') { throw 401; }
            const username = req.identity.username;

            const user = await Profile.findById(username).select('messages');
            debug('User: ', user);
            if (! user) { throw 404; }

            return user.messages;
        },
    },

    '/api/user/messages/count': {
        get: async(req, res) => {
            if (req.identity.type !== 'user') { throw 401; }
            const username = req.identity.username;

            const user = await Profile.findById(username).select('messages');
            debug('User: ', user);
            if (! user) { throw 404; }

            return { count: Array.from(user.messages).length };
        },
    },

    '/api/user/message/read': {
        post: async (req, res) => {
            if (req.identity.type !== 'user') { throw 401; }

            const username = req.identity.username;
            const user = await Profile.findById(username);
            if (! user) { throw 404; }

            const { read, id } = req.args;

            const message = user.messages.id(id);
            if (! message) { throw 404; }

            message.read = read;
            await user.save();
            // 204 No Content
        },
    },
};
