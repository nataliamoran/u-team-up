const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    token: {
        type: String,
        unique: true,
    }
});

module.exports = { Auth: mongoose.model('Auth', AuthSchema) };
