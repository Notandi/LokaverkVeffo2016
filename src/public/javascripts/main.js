$(document).ready(function() {
  getMovies();
  console.log("main.js fallið whats up in this biatch??!!");
  let tala = 550;
  getMovie({tala});

  // breytir um myndir yfir í myndir sem eru væntanlegar þegar að ýtt er á "Væntanlegt" takkan
  $('#playingNow').click(() => {
    loading();
    getMovies();
  });

    // breytir um myndir yfir í myndir sem eru í bíu þegar að ýtt er á "Í bíó" takkan
  $('#playingSoon').click( () => {
    loading();
    getUpcomingMovies();
  });
});

//THE MOVIE DATABASE functions
let movie = [];
function getMovie(movieId) {
  $.post('/movie', movieId, function(resp) {
    movie = resp;
    displayMovie(resp);
  });
}

function createMovie(){
  const sitecontent= $('#movieContent')
}

// fjarlægir allt úr content divinu og setur spinner í gang
function loading(){
  const sitecontent= $('#content');
  sitecontent.empty();
  const spinner = $('<div></div>');
  spinner.attr('class','spinner');
  sitecontent.append(spinner);
}

function displayMovie(response) {
  const movie = response;
  console.log("movie title:");
  console.log(movie);
}
// Birtir allar myndir á forsíðu
//birtir inn í divið með id-ið #content
function showMovies(movieData){
  console.log(movieData);
  const sitecontent= $('#content');
  sitecontent.empty();
  for (let i = 0; i < movieData.length; i++){
    const movieDiv = $('<div></div>');
    movieDiv.attr('class','col-xs-7 col-sm-5 col-md-4 col-lg-4');
    const link = $('<a></a>');
    if(movieData[i].ids.imdb === ""){
      link.attr('href','http://localhost:3000/simplemovie/' + movieData[i].id);
    } else{
      link.attr('href','http://localhost:3000/movie/' + movieData[i].ids.imdb);
    }
    const moviePoster = $('<img>');
    moviePoster.attr('class','poster');
    moviePoster.attr('alt','text');
    moviePoster.attr('src',movieData[i].poster);
    link.append(moviePoster);
    movieDiv.append(link);
    sitecontent.append(movieDiv);
  }


}
// Kvikmyndir.is api-inn
function getMovies(){
  	$.ajax({
      url : 'http://localhost:3000/movies',
      type : 'GET',
      dataType : 'json',
      success : function (response) {
        console.log(response);
        showMovies(response);
      }
    });
};

function getUpcomingMovies() {
  $.ajax({
    url : 'http://localhost:3000/upcoming',
    type : 'GET',
    dataType : 'json',
    success : function (response) {
      console.log(response);
      showMovies(response);
    }
  });
};
