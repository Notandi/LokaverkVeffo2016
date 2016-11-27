$(document).ready(function() {
    $('#playingNow').click(() => {
    loading();
  });

    $('#playingSoon').click( () => {
    loading();
  });
});

function loading(){
  const sitecontent= $('#content');
  sitecontent.hide();
  const spinner = $('<div></div>');
  spinner.attr('class','spinner');
  const loadingscreen= $('.loading');
  loadingscreen.append(spinner);
}
