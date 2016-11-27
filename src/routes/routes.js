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

router.get('/simpleupcomingmovie/:id', cache('5 minutes'), (req, res, next) => {
  const id = req.params.id;
  let movieData;
  let movie;
  movies.upcoming()
    .then((result) => {
      movieData = result.data;
      for (let i = 0; i < movieData.length; i++){
        if (id == movieData[i].id){
          movie = movieData[i];
          res.render('simpleupcomingmovie',{movie});
        }
      }
    })
    .catch((error) => {

    });
});

//id er IMDB
router.get('/movie/:id', cache('5 minutes'), (req, res, next) => {
  //req.params eða req.body?
  console.log('movie/:id fallið kallað!"');
  console.log(req.params.id);
  let id = req.params.id;
  //finn TMDB link út frá imdb
  moviedata.find(id)
  .then((result) => {
    console.log("fannID");
    tmdbId = result.data.movie_results[0].id;

    moviedata.credit(tmdbId)
    .then((result) => {
      creditInfo = result.data;
      moviedata.movie(tmdbId)
      .then((result) => {
        var info = result.data;
        res.render('movie', {movie: info, credit: creditInfo});
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
        res.render('movie', {movie: info});
      })
      .catch((error) => {
        res.render('error movieData.movie failaði(fann ekki heldur credits)', {error});
      });
    });
      
  })
  .catch((error) => {
    res.render('error, Fann ekki TMDb ID út frá IMDbid', {error});
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
//Sækir uppl um castið og crew
// function getCredits(id) {
//   moviedata.credit(id)
//     .then((result) => {
//       creditInfo = result.data;
//       console.log('RESULT DATA cast 0');
//       console.log(result.data.cast[0]);
//       getMovie(id);
//     })
//     .catch((error) => {
//       res.render('error getcredits'), {error};
//     });
// }

// //Sækir upplýsingar um myndirnar sjálfar
// function getMovie(id) {
//   moviedata.movie(id)
//         .then((result) => {
//           var info = result.data;
//           var imgURL = 'https://image.tmdb.org/t/p/w1920/';
//           res.render('movie', {movie: info, credit: creditInfo});
//         })
//         .catch((error) => {
//           res.render('error', {error});
//         });
// }


router.get('*', (req, res, next) => {
  res.status(404).render('message', { message: 'oh no!',
    error: 'Error: Request failed with status code 404' });
});

module.exports = router;
