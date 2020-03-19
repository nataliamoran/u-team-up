module.exports = (mongoose) => {
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
            minlength: 1,
        },
        password: {
            type: String,
            minlength: 1,
        },
        type: { // user/admin
            type: String,
        },
    });

    UserSchema.pre('save', async function () {
        const user = this;

        if (user.isModified('password')) {
            try {
                const hashed = await saltedHash(user.password);
                user.password = hashed;
            } catch (e) {
                console.log(e);
            }
        }
    });
    return mongoose.model('User', UserSchema);
};
