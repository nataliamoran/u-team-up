import {USER_BACKEND} from "../config";

export const updateProfileData = (data, username) => {
    const url = USER_BACKEND + username;

    const request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log('Profile data updated')
            } else {
                console.log('Could not update profile data');
            }
            console.log(res)
        }).catch((error) => {
        console.log(error)
    });
};
