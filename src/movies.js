const axios = require('axios');

const baseURL = process.env.BASEURL; // Sækja úr environment breytu

const timeout = 10000;

let token;

let headers = { x-access-token: token}

let instance = axios.create({ baseURL, timeout, headers });

/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */
function movies() {
  return instance.get('/movies/');
}
function upcoming() {
  return instance.get('/upcoming/');
}

//mögulega sleppa poster .því hægt að fá frá moviedb
// function posters(imdbid) {
//   return instance.get('/posters' + '?' + imdbid);
// }

function genres() {
  return instance.get('/genres');
}

function cinemas() {
  return instance.get('/cinemas');
}

function newAPIKey() {

}

module.exports = {
  movies,
  upcoming,
  posters,
  genres,
  cinemas,
  newAPIKey,
};
