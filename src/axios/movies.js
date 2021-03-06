const axios = require('axios');

const NanoTimer = require('nanotimer');

const baseURL = process.env.BASEURL; // Sækja úr environment breytu

const timeout = 1000;

let headers;

let instance = axios.create({ baseURL, timeout });

const data = {
  username: 'apameistarinn',
  password: 'gussiskassi',
};

const tokenGen = axios.create({ baseURL, timeout });

const timer = new NanoTimer();

const time = '86400s'; // the time we wait before regenrating the api keys

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
function cinemas() {
  return instance.get('/theaters', headers);
}

function newToken() {
  return tokenGen.post('/authenticate', data);
}

function generateNewToken() {
  newToken()
  .then((result) => {
    headers = { 'x-access-token': result.data.token };
    instance = axios.create({ baseURL, headers });
  })
  .catch((error) => {
  });
}

// generatar nýtt token útfrá api key í hvert skipti sem að kveikt er á server
generateNewToken();
// timer fall sem að sækjir nýtt token á 24 tíma fresti
timer.setInterval(generateNewToken, '', time);

module.exports = {
  movies,
  upcoming,
  cinemas,
};
