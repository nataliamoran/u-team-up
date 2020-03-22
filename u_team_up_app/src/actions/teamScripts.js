import {TEAMS_BACKEND} from "../config";

export const deleteTeamFromDB = (id) => {
    const url = TEAMS_BACKEND + '/' + id;

    const request = new Request(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log('Team is deleted from the DB')
            } else {
                console.log('Could not delete the team from the DB');
            }
            console.log(res)
        }).catch((error) => {
        console.log(error)
    });
};

export const updateTeamDataInDB = (data, id) => {
    const url = TEAMS_BACKEND + '/' + id;

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
                console.log('Team data is updated in the DB')
            } else {
                console.log('Could not update the team data in the DB');
            }
            console.log(res)
        }).catch((error) => {
        console.log(error)
    });
};

export const addTeamToDB = (data) => {
    const url = TEAMS_BACKEND;
    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log('Added team')
            } else {
                console.log('Could not add team')
            }
            console.log(res)
        }).catch((error) => {
        console.log(error)
    });
};




