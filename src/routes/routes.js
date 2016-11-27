/* routes hér */
const express = require('express');

const apicache = require('apicache');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

let cache = apicache.middleware;

//
router.get('/', (req, res, next) => {
  res.render('index');
});
//setja upp þannig að þessi linkur sýni myndir sem eru upcoming
router.get('/comingsoon', (req, res, next) => {
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

router.get('/simplemovie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movie;
  movies.movies()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++){
        if (id == movieData[i].id){
          movie = movieData[i];
          res.render('simplemovie',{movie});
        }
      }
    })
    .catch((error) => {

    });
});

//id er IMDB
router.get('/movie/:id', cache('5 minutes'), (req, res, next) => {
  //req.params eða req.body?
  console.log('movie/:id fallið kallað!?"');
  console.log(req.params.id);
  let id = req.params.id;

  //finnd TMDB link út frá imdb
  let creditInfo = [];
  moviedata.find(id)
    .then((result) => {
      console.log("TMDB ID-IÐ?!!")
      console.log(result.data.movie_results[0].id);

      moviedata.credit(result.data.movie_results[0].id)
      .then((result) => {
        creditInfo = result.data
        console.log(result.data);
      })
      .catch((error) => {
        res.render('error'), {error};
      });

      moviedata.movie(result.data.movie_results[0].id)
        .then((result) => {
          var info = result.data;
          var imgURL = 'https://image.tmdb.org/t/p/w1920/';
          res.render('movie', {movie: info, credit: creditInfo});
        })
        .catch((error) => {
          res.render('error', {error});
        });
    })
    .catch((error) => {
      res.render('error', {error});
    });

  // moviedata.movie(id)
  //   .then((result) => {
  //     const info = result.data;
  //     res.render('movie', {film : info});
  //   })
  //   .catch((error) => {
  //     res.render('error', {error});
  //   });

  // const fyrirsogn = texti + req.params.name;
  // schedule.channel(req.params.name)
  //   .then((result) => {
  //     const dagskra = result.data.results;
  //     res.render('channel', { title: fyrirsogn, channels: dagskra });
  //   })
  //   .catch((error) => {
  //     res.render('error', { title: 'Oh no!', error });
  //   });
});


router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
