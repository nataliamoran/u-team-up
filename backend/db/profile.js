module.exports = mongoose => {
    const { ObjectId } = mongoose;

    const MessageSchema = new mongoose.Schema({
        teamUniversity: String,
        teamCourse: String,
        messageText: String,
        event: Object,
        read: Boolean,
    });

    const ProfileSchema = new mongoose.Schema({
        _id: {
            type: String,
            alias: "username"
        },
        imageUrl: String,
        fullname: {
            type: String
        },
        university: String,
        yearOfStudy: Number,
        majorOfStudy: String,
        applications: Array,
        events: Array,
        messages: [MessageSchema],
        teams: [ObjectId],
        coursesTaken: [String],
        currentCourses: [String],
        reviews: [String],
        description: String,
        email: String,
        location: String,
        gpa: String,
        pastProject: [String],
        experience: [String]
    });

    return mongoose.model("Profile", ProfileSchema);
};
