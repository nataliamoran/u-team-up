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
        image: ObjectId,
        fullname: {
            type: String
        },
        university: String,
        year: Number,
        major: String,
        applications: Array,
        events: Array,
        messages: {
            type: [MessageSchema],
            select: false,
        },
        teams: [ObjectId],
        coursesTaken: [ObjectId],
        currentCourses: [ObjectId],
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
