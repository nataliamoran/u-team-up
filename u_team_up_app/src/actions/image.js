import { IMAGES_BACKEND } from "../config";

export const addImage = (form, dashboardComp) => {
    // the URL for the request
    const url = IMAGES_BACKEND;

    // The data we are going to send in our request
    const imageData = new FormData(form);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData
    });

    // Send the request with fetch()
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                dashboardComp.setState({
                    message: {
                        body: "Success: Added an image.",
                        type: "success"
                    }
                });
            } else {
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getImage = imageListComp => {
    // the URL for the request
    const url = IMAGES_BACKEND;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(json => {
            imageListComp.setState({ imageList: json.images });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (imageId, dashboardComp, imageListComp) => {
    // the URL for the request
    const url = IMAGES_BACKEND + "/" + imageId;

    const request = new Request(url, {
        method: "delete"
    });

    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                dashboardComp.setState({
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });

                // remove the image from the imageList state
                const filteredList = imageListComp.state.imageList.filter(
                    img => img.image_id !== imageId
                );
                imageListComp.setState({ imageList: filteredList });
            } else {
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
