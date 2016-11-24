//moviedb api
const axios = require('axios');

const baseURL = process.env.BASEURL2; // Sækja úr environment breytu

const timeout = 10000;

//API Key (v3 auth)
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

function movie(id) {
  return instance.get('/movie/' + id + api_key);
}

function recommended(id) {
  return instance.get('/movie/' + id + '/recommendations');
}

function credit(id) {
  return instance.get('/movie/' + id +'/credits' );
}

function person(id) {
  return instance.get('/person/' + id);
}
function personimage(id) {
  return instance.get('/person' + id + 'images');
}
function personcredit(id) {
  return instance.get ('/person/' + id  + '/movie_credits');
}

///hugmynd nota backdrops sem background fyrir myndasíðuna
// sýna reccomended myndir þannig að stendur ef þú fýlaðir þessar þá áttu eftir að fýla þessa í botn
// sýna trailera
// kanski sýna aðrar myndir sem að frægur leikari hefur leikið í eða frekar leikjstjóri leikstýrt
// sýna mynd og svo credi
// sýna myndir af leikurum

module.exports = {
  movie,
  recommended,
  credit,
  person,
  personimage,
  personcredit
};
