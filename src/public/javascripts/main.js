$(document).ready(function() {
  getMovies();
  console.log("main.js fallið whats up in this biatch??!!");
  let tala = 550;
  getMovie({tala});
});

//THE MOVIE DATABASE functions
let movie = [];
function getMovie(movieId) {
  $.post('/movie', movieId, function(resp) {
  	console.log("resperinooo");
    console.log(resp);
    movie = resp;
    displayMovie(resp);
  });

}

function displayMovie(response) {
  const movie = response
  console.log("movie title:");
  console.log(movie);
}
// Birtir allar myndir á forsíðu
//birtir inn í divið með id-ið #content
function showMovies(movieData){
  console.log(movieData);
  const sitecontent= $('#content');
  sitecontent.empty();
  for (let i = 0; i < movieData.length ;i++ ){
    const movieDiv = $('<div></div>');
    movieDiv.attr('class','col-xs-7 col-sm-5 col-md-4');
    const moviePoster = $('<img>');
    moviePoster.attr('class','poster');
    moviePoster.attr('src',movieData[i].poster);
    movieDiv.append(moviePoster);
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