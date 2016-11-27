$(document).ready(function() {
  getCinemas();
});
function getCinemas(){
  	$.ajax({
      url : 'http://localhost:3000/cinemas',
      type : 'GET',
      dataType : 'json',
      success : function (response) {
        showCinemas(response);
      }
    });
};
function showCinemas(cinemaobject){
  for(let i = 1; i < (cinemaobject.length + 1); i++){
    let cinema = $('a[cinemaid="'+ i + '"]');
    cinema.attr('href','http://' +cinemaobject[i-1].website);
    cinema.text(cinemaobject[i-1].name);
  }
};
