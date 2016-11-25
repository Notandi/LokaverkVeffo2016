/* routes hér */
const express = require('express');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies', (req, res, next) => {
  movies.movies()
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    })
    .catch((error) => {
      console.log(error);
      res.send("no");
    });
});

router.get('/upcoming', (req, res, next) => {
  movies.upcoming()
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {

    });
});

router.get('/cinemas', (req, res, next) => {
  movies.cinemas()
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) =>{

    });
});

router.get('/genres', (req, res, next) =>{
  movies.genres()
    .then((result) =>{
      console.log(result.data);
    })
    .catch((error) => {

    });
})

router.get('/movie/:id', (req, res, next) => {

});

router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
