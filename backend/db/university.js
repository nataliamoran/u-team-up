module.exports = mongoose => {
    const CourseSchema = new mongoose.Schema({
        code: String,
        title: String,
    });

    const UniversitySchema = new mongoose.Schema({
        name: String,
        courses: [CourseSchema],
    });

    return mongoose.model('University', UniversitySchema);
};
