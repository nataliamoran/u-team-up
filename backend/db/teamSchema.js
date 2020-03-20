module.exports = (mongoose) => {

    const TeamSchema = new mongoose.Schema({
        university: {
            type: String,
            required: true,
            minlegth: 1,
            trim: true
        },
        course: {
            type: String,
            required: true,
            minlegth: 1,
            trim: true
        },
        description: {
            type: String,
            required: true,
            minlegth: 1,
            trim: true
        },
        members:{
            type: Array,
            required: true
        }
    });

    return mongoose.model('Team', TeamSchema);
};
