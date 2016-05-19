$(document).ready(function(){
      getFilmsJSON();
      newTaskListener();
  })
    function addFilm(film){
      $('#films').append('<li>' + film.title + '</ul>');
  }

  function newTaskListener(){
      $('#new_film').submit(function(e){
        e.preventDefault();

        $.post('http://destroyed.herokuapp.com/films', $(this).serialize(), addFilm);
        this.reset();
    })
  }

  function getFilmsJSON(){
    $.ajax({
        method: 'GET',
        url: 'http://destroyed.herokuapp.com/films'
    })
    .done(function(response){
        $.each(response.films, function(){ addFilm(this); });
    })
    .error(function(xhr, unknown, error){
        console.log(error);
    })
}