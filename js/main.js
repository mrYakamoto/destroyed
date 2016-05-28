$(document).ready(function(){

  myNavBar.init(
    [ "header", "header-container", "brand", "subtitle"]
    );
  window.addEventListener( "scroll", function(e) {
    offSetManager()
  })
  $(".movie-title").fitText();

  initTrailers();
});

function initTrailers(){
  openTrailerButtonListener();
  closeTrailerButtonListener();
};

function openTrailerButtonListener(){
  $('.trailer-link').click(function(e){
    e.preventDefault();
    var trailerUrl = $(this).attr('data-trailer-url');
    populateTrailerWindow(trailerUrl);
    $('#trailer-container').show();
  })
}
function closeTrailerButtonListener(){
  $('#close-trailer-icon').click(function(e){
    e.preventDefault();
    $('#trailer-container').hide();
    emptyTrailerWindow();
  })
}

function populateTrailerWindow(url){
  $('#trailer-iframe').attr('src', url);
}
function emptyTrailerWindow(){
  $('#trailer-iframe').attr('src', '');
}


var myNavBar = {
  flagAdd: true,
  elements: [],

  init: function (elements) {
    this.elements = elements;
  },

  add : function() {
    if(this.flagAdd) {
      for(var i=0; i < this.elements.length; i++) {
        document.getElementById(this.elements[i]).className += " fixed-theme";
      }
      this.flagAdd = false;
    }
  },

  remove: function() {
    for(var i=0; i < this.elements.length; i++) {
      document.getElementById(this.elements[i]).className =
      document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
    }
    this.flagAdd = true;
  }

};

function offSetManager(){
  var yOffset = 0;
  var currYOffSet = window.pageYOffset;

  if(yOffset < currYOffSet) {
    myNavBar.add();
  }
  else if(currYOffSet == yOffset){
    myNavBar.remove();
  }
}