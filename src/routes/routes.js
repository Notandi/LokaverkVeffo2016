/* routes hér */
const express = require('express');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

router.get('/', (req, res, next) => {
  res.render('index');
});
//Sækir myndir frá kvikmyndir API
router.get('/movies', (req, res, next) => {
  movies.movies()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
    });
});
//kvikmyndir API
router.get('/upcoming', (req, res, next) => {
  movies.upcoming()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
    });
});

//kvikmyndir API
router.get('/cinemas', (req, res, next) => {
  movies.cinemas()
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) =>{
    });
});
//kvikmyndir API
router.get('/genres', (req, res, next) =>{
  movies.genres()
    .then((result) =>{
      res.send(result.data);
    })
    .catch((error) => {
    });
})

//TMDB sækja gögn um mynd
router.post('/movie', function (req, res, next) {
  console.log("/movie routes");
  console.log(req.body.tala);
  let id = req.body.tala;
  moviedata.movie(id)
    .then((result) => {
      console.log("RESULT movie tmdb");
      console.log(result.data);
      const movie = result.data;
      res.send(movie);
    })
    .catch((error) => {
      console.log('Error');
      console.log(error);
    });
})

router.get('/movie/:id', (req, res, next) => {
  let id = req.params.id;

});

router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
