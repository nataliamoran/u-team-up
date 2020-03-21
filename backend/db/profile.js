module.exports = (mongoose) => {
    const { ObjectId } = mongoose;

    const ProfileSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            minlength: 1,
        },
        fullname: {
            type: String,
            minlength: 1,
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
