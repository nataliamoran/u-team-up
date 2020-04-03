module.exports = mongoose => {
    const { ObjectId } = mongoose;

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
        messages: Array,
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
