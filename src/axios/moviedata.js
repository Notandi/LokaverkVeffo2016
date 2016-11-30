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

const movieroute = '/movie/';

function find(id) {
  // leitar að tmbd_id útfrá imdb_id sem
  // að fæst útfrá kvimyndir.is apa tt bætt fyrir
  // framan því öll imdb movie id eru með tt fyrir framan
  const findroute = '/find/';
  const tt = 'tt';
  const end = '&external_source=imdb_id';
  return instance.get(findroute + tt + id + apiKey + end);
}
function movie(id) {
  return instance.get(movieroute + id + apiKey);
}

function recommended(id) {
  const recommendationsroutes = '/recommendations';
  return instance.get(movieroute + id + recommendationsroutes + apiKey);
}

function credit(id) {
  const creditroute = '/credits';
  return instance.get(movieroute + id + creditroute + apiKey);
}

module.exports = {
  find,
  movie,
  recommended,
  credit,
};
