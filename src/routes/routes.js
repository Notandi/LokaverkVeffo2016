/* routes hér */
const express = require('express');

const apicache = require('apicache');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

let cache = apicache.middleware;
let creditInfo = [];
let tmdbId = 0;

//
router.get('/', cache('5 minutes'), (req, res, next) => {
  // res.render('index');
  movies.movies()
    .then((result) => {
      res.render('movies',{movie: result.data});
    })
    .catch((error) => {
    });
});
//setja upp þannig að þessi linkur sýni myndir sem eru upcoming
router.get('/comingsoon', cache('5 minutes'), (req, res, next) => {
  movies.upcoming()
    .then((result) => {
      res.render('upcomingmovies',{movie: result.data});
    })
    .catch((error) => {
    });
});
//Sækir myndir frá kvikmyndir API
router.get('/movies', cache('5 minutes'), (req, res, next) => {
  movies.movies()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
    });
});
//kvikmyndir API
router.get('/upcoming', cache('5 minutes'), (req, res, next) => {
  movies.upcoming()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
    });
});

//kvikmyndir API
router.get('/cinemas', cache('5 minutes'), (req, res, next) => {
  movies.cinemas()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) =>{
    });
});
//kvikmyndir API
router.get('/genres', cache('5 minutes'), (req, res, next) =>{
  movies.genres()
    .then((result) =>{
      res.send(result.data);
    })
    .catch((error) => {
    });
});

router.get('/movie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movie_is;
  movies.movies()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++){
        if (id == movieData[i].id){
          movie_is = movieData[i];
          let imdb_id = movieData[i].ids.imdb;
          console.log(imdb_id);
          moviedata.find(imdb_id)
          .then((result) => {
            console.log("fannID");
            tmdbId = result.data.movie_results[0].id;

            moviedata.credit(tmdbId)
            .then((result) => {
              creditInfo = result.data;
              moviedata.movie(tmdbId)
              .then((result) => {
                var info = result.data;
                console.log("stuff");
                res.render('simplemovie', {movie_is,movie: info, credit: creditInfo});
              })
              .catch((error) => {
                res.render('error movieData.movie failaði(fann samt credits)', {error});
              });
            })
            .catch((error) => {
              console.log("fann ekki credits");
              moviedata.movie(tmdbId)
              .then((result) => {
                var info = result.data;
                res.render('simplemovie', {movie_is,movie: info});
              })
              .catch((error) => {
                res.render('error movieData.movie failaði(fann ekki heldur credits)', {error});
              });
            });

          })
          .catch((error) => {
            res.render('simpleupcomingmovie',{movie_is});
          });
        }
      }
    })
    .catch((error) => {

    });
});

router.get('/upcomingmovie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movie_is;
  movies.upcoming()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++){
        if (id == movieData[i].id){
          movie_is = movieData[i];
          let imdb_id = movieData[i].ids.imdb;
          console.log(imdb_id);
          moviedata.find(imdb_id)
          .then((result) => {
            console.log("fannID");
            tmdbId = result.data.movie_results[0].id;

            moviedata.credit(tmdbId)
            .then((result) => {
              creditInfo = result.data;
              moviedata.movie(tmdbId)
              .then((result) => {
                var info = result.data;
                console.log("stuff");
                res.render('simpleupcomingmovie', {movie_is,movie: info, credit: creditInfo});
              })
              .catch((error) => {
                res.render('error movieData.movie failaði(fann samt credits)', {error});
              });
            })
            .catch((error) => {
              console.log("fann ekki credits");
              moviedata.movie(tmdbId)
              .then((result) => {
                var info = result.data;
                res.render('simpleupcomingmovie', {movie_is,movie: info});
              })
              .catch((error) => {
                res.render('error movieData.movie failaði(fann ekki heldur credits)', {error});
              });
            });

          })
          .catch((error) => {
            res.render('simpleupcomingmovie',{movie_is});
          });
        }
      }
    })
    .catch((error) => {

    });
});

router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
