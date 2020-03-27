import {USER_BACKEND} from "../config";

export const updateProfileData = (data, identity) => {
    const url = USER_BACKEND + identity.username;

    const request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        identity: identity,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    console.group("updateProfileData")
    console.log(request.identity)
    console.log(data)
    console.groupEnd()

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
