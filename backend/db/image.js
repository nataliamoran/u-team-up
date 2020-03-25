module.exports = (mongoose) => {
    const imageSchema = mongoose.Schema({
        image_id: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        created_at: String
    });

    return mongoose.model("Image", imageSchema);
};
