$(document).ready(function(){
  console.log(test());
})

function test(){
  $.ajax({
    method: 'GET',
    url: 'http://destroyed.herokuapp.com/films'
  })
  .done(function(response){
    return response;
  })
  .error(function(xhr, unknown, error){
    return error;
  })
}