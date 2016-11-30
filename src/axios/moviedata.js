const axios = require('axios');

const baseURL = process.env.BASEURL2; // Sækja úr environment breytu

const timeout = 3000;

const apiKey = '?api_key=3c8664074077c3ccb04b8bd51b3c9167';

const instance = axios.create({ baseURL, timeout });

// notað til þess að ná í frekari upplýsingar um
// myndir svosem leikara, leikstjóra aðrar tengdar myndir etc

/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */

function find(id) {
  // leitar að tmbd_id útfrá imdb_id sem
  // að fæst útfrá kvimyndir.is apa tt bætt fyrir
  // framan því öll imdb movie id eru með tt fyrir framan
  return instance.get('/find/' + 'tt' + id +
  apiKey + '&external_source=imdb_id');
}
function movie(id) {
  return instance.get('/movie/' + id + apiKey);
}

function recommended(id) {
  return instance.get('/movie/' + id + '/recommendations' + apiKey);
}

function credit(id) {
  return instance.get('/movie/' + id + '/credits' + apiKey);
}

module.exports = {
  find,
  movie,
  recommended,
  credit,
};
