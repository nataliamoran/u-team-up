import {PROFILE_BACKEND} from "../config";

export const updateProfileData = (data, username) => {
    const url = PROFILE_BACKEND + '/' + username;

    const request = new Request(url, {
        method: 'PATCH',
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
