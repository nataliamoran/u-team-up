const { User, Auth } = require('../db/mongoose');

async function authMiddleware(req, res, next) {
    if (req.path.startsWith('/auth/')) {
        switch (req.path) {
        case '/auth/login':
            await login(req, res);
            return;

        case '/auth/signup':
            await signup(req, res);
            return;
        }
    }
    await injectIdentity(req, res);
    next();
}

async function signup(req, res) {
    console.log('params:', req.params);
    const { username, password } = req.query;
    const user = new User({ username, password });
    try {
        user.save();
    } catch (e) {
        res.status(500).send({ error: e });
        return;
    }

    res.send(user);
}

async function login(req, res) {
    // TODO
}

async function injectIdentity(req, res) {
    req.identity = {};
}

module.exports = authMiddleware;
