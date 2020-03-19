module.exports = (mongoose) => {
    const AuthSchema = new mongoose.Schema({
        username: {
            type: String,
        },
        token: {
            type: String,
            unique: true,
        }
    });
    return mongoose.model('Auth', AuthSchema);
};
