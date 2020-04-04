const { Image, Profile } = require("../db/mongoose");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "xw",
    api_key: "311666583251715",
    api_secret: "4IYh_QGr2OZCeuxAvDXkYE34TVc"
});

const createImageCrud = function(app) {
    app.post("/api/images/:username", multipartMiddleware, (req, res) => {
        // Use uploader.upload API to upload image to cloudinary server.
        cloudinary.uploader.upload(
            req.files.image.path, // req.files contains uploaded files
            function(result) {
                // Create a new image using the Image mongoose model
                var img = new Image({
                    image_id: result.public_id, // image id on cloudinary server
                    image_url: result.url, // image url on cloudinary server
                    created_at: new Date()
                });
                const saveImageInmUserDB = async (result) => {
                    const profile = await Profile.findById(req.params.username);

                    profile.imageUrl = img.image_url;

                    return profile.save().then(() => {
                        return result;
                        // res.status(201).send(result);
                    });
                };

                // Save image to the database
                img.save().then(
                    saveRes => {
                        saveImageInmUserDB(saveRes).then(result => {
                            res.send(result);
                        });
                    },
                    error => {
                        res.status(400).send(error); // 400 bad request
                    }
                );
            }
        );
    });

    // a route to get all images
    app.get("/api/images", (req, res) => {
        Image.find().then(
            images => {
                res.send({ images });
            },
            error => {
                res.status(500).send(error);
            }
        );
    });

    /// remove an image by its id
    app.delete("/api/images/:imageId", (req, res) => {
        const imageId = req.params.imageId;

        // Delete an image by its id on the cloudinary server
        cloudinary.uploader.destroy(imageId, function(result) {
            // Delete the image from the database
            Image.findOneAndRemove({ image_id: imageId })
                .then(img => {
                    if (!img) {
                        res.status(404).send();
                    } else {
                        res.send(img);
                    }
                })
                .catch(error => {
                    res.status(500).send();
                });
        });
    });
};

module.exports = {createImageCrud};
