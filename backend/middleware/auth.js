const { User, Auth } = require('../db/mongoose');

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
        const user = new User({ username, password });
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send({ error: e });
        return;
    }
}

async function login(req, res) {
    // TODO
}

async function injectIdentity(req, res) {
    req.identity = {};
}

module.exports = authMiddleware;
