$(document).ready(function() {
  getMovies()
});

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
