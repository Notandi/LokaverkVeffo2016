const axios = require('axios');

const NanoTimer = require('nanotimer');

const baseURL = process.env.BASEURL; // Sækja úr environment breytu

let headers;

let instance = axios.create({ baseURL, headers });

const data = {
  username: "apameistarinn",
  password: "gussiskassi",
};

const apiKEYGen = axios.create ({baseURL});

const timer = new NanoTimer();

let time = '86400s'; //the time we wait before regenrating the api keys

// timer fall sem að sækjir nýja api lykla á 24 tíma fresti
timer.setInterval(generateNewAPIKey, '', time);
generateNewAPIKey();
/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */
function movies() {
  return instance.get('/movies/', headers);
}
function upcoming() {
  return instance.get('/upcoming/', headers);
}

function genres() {
  return instance.get('/genres', headers);
}

function cinemas() {
  return instance.get('/cinemas', headers);
}

function newAPIKey() {
  return apiKEYGen.post('/authenticate', data);
}

function generateNewAPIKey(){
  newAPIKey()
  .then((result) => {
    headers = {'x-access-token': result.data.token};
    instance = axios.create({baseURL, headers});
  })
  .catch((error) => {
  });
}

module.exports = {
  movies,
  upcoming,
  genres,
  cinemas,
  newAPIKey,
};
