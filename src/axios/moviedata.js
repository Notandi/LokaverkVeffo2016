const axios = require('axios');

const baseURL = process.env.BASEURL2; // Sækja úr environment breytu

const timeout = 1000;

const api_key = '?api_key=3c8664074077c3ccb04b8bd51b3c9167';

const instance = axios.create({ baseURL, timeout});

// notað til þess að ná í frekari upplýsingar um myndir svosem leikara, leikstjóra aðrar tengdar myndir etc

/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */

function find(id) {
  // leitar að tmbd_id útfrá imdb_id sem að fæst útfrá kvimyndir.is apa tt bætt fyrir framan því öll imdb movie id eru með tt fyrir framan
  return instance.get( '/find/' + 'tt' + id + api_key + '&external_source=imdb_id')
}
function movie(id) {
  return instance.get('/movie/' + id + api_key);
}

function recommended(id) {
  return instance.get('/movie/' + id + '/recommendations'+ api_key);
}

function credit(id) {
  return instance.get('/movie/' + id +'/credits' + api_key);
}

function person(id) {
  return instance.get('/person/' + id + api_key);
}
function personimage(id) {
  return instance.get('/person' + id + 'images' + api_key);
}
function personcredit(id) {
  return instance.get ('/person/' + id  + '/movie_credits' + api_key);
}

///hugmynd nota backdrops sem background fyrir myndasíðuna
// sýna reccomended myndir þannig að stendur ef þú fýlaðir þessar þá áttu eftir að fýla þessa í botn
// sýna trailera
// kanski sýna aðrar myndir sem að frægur leikari hefur leikið í eða frekar leikjstjóri leikstýrt
// sýna mynd og svo credi
// sýna myndir af leikurum

module.exports = {
  find,
  movie,
  recommended,
  credit,
  person,
  personimage,
  personcredit,
};
