const debug = console.log;

const { User, Auth, Profile } = require('../db/mongoose');

const randomToken = require('random-token');
const length = 32;
const generateToken = () => randomToken(length);

const bcrypt = require('bcryptjs');

async function authMiddleware(req, res, next) {
    if (req.path.startsWith('/auth/')) {
        if (req.method === 'POST') {
            switch (req.path) {
            case '/auth/login':
                await login(req, res);
                return;

            case '/auth/signup':
                await signup(req, res);
                return;
            }
        }
    }
    await injectIdentity(req, res);
    next();
}

async function signup(req, res) {
    const { username, password } = req.args;
    try {
        const user = new User({ username, password, type: 'user' });
        await user.save();
        const profile = new Profile({ username });
        await profile.save();
        res.status(201).send();
    } catch (e) {
        res.status(500).send({ error: e });
        return;
    }
}

async function login(req, res) {
    const { username, password } = req.args;

    const user = await User.findById(username);
    if (!user) {
        res.status(401).send({ error: 'No such user.' });
        return;
    }

    if (! (await bcrypt.compare(password, user.password))) {
        res.status(401)
            .send({ error: 'Username or password is not correct.' });
        return;
    }

    for (const retry of [0,1,2,3,4]) {
        try {
            const token = generateToken();
            const auth = new Auth({ username, token });
            auth.save();
            res.status(201)
                .send({ username, token, type: user.type });
            return;
        } catch (e) {
            debug('Error generating token. Retrying.', retry);
        }
    }
    res.status(500)
        .send({ error: 'Cannot log in.' });
}

async function injectIdentity(req, res) {
    const { token } = req.args;

    if (token) {
        delete req.args.token;
        const auth = await Auth.findOne({ token });
        if (auth) {
            const user = await User.findById(auth.username);
            if (user) {
                req.identity = {
                    type: user.type,
                    username: user.username,
                    // should be deprecated
                    uid: user.username,
                };
                return;
            }
        }
    }
    req.identity = {
        type: 'guest',
        get username() { throw 401 },
        get uid() { throw 401 },
    };
}

module.exports = authMiddleware;
