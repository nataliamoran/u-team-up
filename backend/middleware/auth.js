const mongoose = require('../db/mongoose');

async function authMiddleware(req, res, next) {
    if (req.path === '/auth') {
        res.send('Captured by auth middleware!');
    }
    // TODO
    next();
}

module.exports = authMiddleware;
