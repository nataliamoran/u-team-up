const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const seed = 10;
const genSeedPromise = bcrypt.genSalt(seed);

const saltedHash = (password) =>
      genSeedPromise // so we generate the seed only once.
      .then(salt => bcrypt.hash(password, salt));

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
});

UserSchema.pre('save', async function () {
    const user = this;

    if (user.isModified('password')) {
        const hashed = await saltedHash(user.password);
        user.password = hashed;
    }
});

module.exports = { Users: mongoose.model('Users', UserSchema) };
