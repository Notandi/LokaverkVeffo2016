/* routes hér */
const express = require('express');

const router = express.Router();

const movies = require('../axios/movies');

const moviedata = require('../axios/moviedata');

router.get('/', (req, res, next) => {
  movies.movies()
    .then((result) => {
      console.log(result.data);
      res.send("goodjob");
    })
    .catch((error) => {
      console.log(error);
      res.send("no");
    });
});

// router.get('/upcoming', (req, res, next) => {
//   movies.upcoming
//     .then((result) => {
//       const upcoming = result.data;
//     })
//     .catch((error) => {
//
//     });
// });
//
// router.get('/cinemas', (req, res, next) => {
//   movies.cinemas
//     .then((result) => {
//       const cinemas = result.data;
//     })
//     .catch((error) =>{
//
//     });
// });

router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
