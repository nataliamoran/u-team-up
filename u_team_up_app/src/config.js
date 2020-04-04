// These are the settings for prod deployment environment
export const SERVER_URL = window.location.origin+'/';
const BASE_URL = window.location.origin + '/api';

// These are the settings for local development environment
// const BASE_URL = 'http://localhost:5000/api';
// export const SERVER_URL = 'http://localhost:5000/';
export const TEAMS_BACKEND = BASE_URL + '/teams';
export const USERS_BACKEND = BASE_URL + '/users';
export const USER_BACKEND = BASE_URL + '/user?username=';
export const PROFILE_BACKEND = BASE_URL + '/profiles';
export const IMAGES_BACKEND = BASE_URL + '/images';
