module.exports = (mongoose) => {
    const { ObjectId } = mongoose;

    const ProfileSchema = new mongoose.Schema({
        _id: {
            type: String,
            alias: 'username',
        },
        fullname: {
            type: String,
        },
        university: ObjectId,
        year: Number,
        coursesTaken: [ObjectId],
        currentCourses: [ObjectId],
        teams: [ObjectId],
        major: String,
        description: String,
        experience: [String],
        image: ObjectId,
        location: String,
        pastProject: [String],
        email: String,
    });

    return mongoose.model('Profile', ProfileSchema);
}
