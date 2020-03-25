const mongoose = require("mongoose");

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

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
