/* routes hér */
const express = require('express');

const apicache = require('apicache');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

const cache = apicache.middleware;


// route fyrir forsíðuna
router.get('/', cache('5 minutes'), (req, res, next) => {
  movies.movies()
    .then((result) => {
      res.render('movies', { movie: result.data });
    })
    .catch((error) => {
      // vantar error ef ekki næst samband við apa
    });
});


// route sem að sýnir myndir sem eru á leiðinni
router.get('/comingsoon', cache('5 minutes'), (req, res, next) => {
  movies.upcoming()
    .then((result) => {
      res.render('upcomingmovies', { movie: result.data });
    })
    .catch((error) => {
      // vantar error ef ekki næst samband við apa
    });
});

// sækir gögn um alla bíósali á landinu
router.get('/cinemas', cache('5 minutes'), (req, res, next) => {
  movies.cinemas()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
      // vantar error ef engar upplýsingar frá apa
    });
});


// sýnir mynd útfrá id
router.get('/movie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movieIs;
  let movieTmdb;
  let creditTmdb;
  let imdbId;
  let tmdbID;
  movies.movies()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++) {
        if (id == movieData[i].id) {
          movieIs = movieData[i];
          imdbId = movieData[i].ids.imdb;
        }
      }
      moviedata.find(imdbId)
      .then((result) => {
        tmdbID = result.data.movie_results[0].id;
        moviedata.movie(tmdbID)
          .then((result) => {
            movieTmdb = result.data;
            moviedata.credit(tmdbID)
                .then((result) => {
                  creditTmdb = result.data;
                  res.render('movie',
                  { movieIs, movie: movieTmdb, credit: creditTmdb });
                })
                .catch((error) => {
                  // vantar errror ef ekkert credit finnst
                });
          })
          .catch((error) => {
            // vantar error ef myndin finnst ekki
          });
      })
      .catch((error) => {
        // error ef engar upplýsingar frá imdbId
      });
    })
    .catch((error) => {
    });
});


// sýnir upcoming mynd útfrá id
router.get('/upcomingmovie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movieIs;
  let movieTmdb;
  let creditTmdb;
  let imdbId;
  let tmdbID;
  movies.upcoming()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++) {
        if (id == movieData[i].id) {
          movieIs = movieData[i];
          imdbId = movieData[i].ids.imdb;
        }
      }
      moviedata.find(imdbId)
      .then((result) => {
        tmdbID = result.data.movie_results[0].id;
        moviedata.movie(tmdbID)
          .then((result) => {
            movieTmdb = result.data;
            moviedata.credit(tmdbID)
                .then((result) => {
                  creditTmdb = result.data;
                  res.render('upcomingmovie',
                  { movieIs, movie: movieTmdb, credit: creditTmdb });
                })
                .catch((error) => {
                  // vantar errror ef ekkert credit finnst
                });
          })
          .catch((error) => {
            // vantar error ef myndin finnst ekki
          });
      })
      .catch((error) => {
        // error ef engar upplýsingar frá imdbId
      });
    })
    .catch((error) => {

    });
});


// sýnir error ef farið er á route sem er ekki skilgreint
router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
