$(document).ready(function(){

  myNavBar.init(
    [ "header", "header-container", "brand", "subtitle"]
  );

  window.onscroll = function(e) {
    offSetManager();
  }

  $(".movie-title").fitText();
  initTrailers();

  scrollNavListener();
});

function scrollNavListener(){
  $('.nav-link').click(function(e){
    e.preventDefault();

    var offsetY = $($(this).attr('data-linked-item')).offset().top - 100;
    $('html, body').animate({
      scrollTop: offsetY
    }, 800 );
  })
}

function initTrailers(){
  openTrailerButtonListener();
  closeTrailerButtonListener();
};

function openTrailerButtonListener(){
  $('.overlay').click(function(e){
    e.preventDefault();
    var trailerUrl = $(this).attr('data-trailer-url');
    populateTrailerWindow(trailerUrl);
    $('#trailer-container').show();
    escapeButtonListener();
  })
}
function closeTrailerButtonListener(){
  $('#close-trailer-icon').click(function(e){
    e.preventDefault();
    $('#trailer-container').hide();
    emptyTrailerWindow();
  })
}
function escapeButtonListener(){
  $(document).keyup(function(e) {
     if (e.keyCode == 27) {
      $('#trailer-container').hide();
      emptyTrailerWindow();
    }
});
}

function populateTrailerWindow(url){
  if ( url.indexOf('?') > -1 ){
    url += '&autoplay=1&iv_load_policy=3';
  }
  else {
    url += '?autoplay=1&iv_load_policy=3';
  }
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
  navHighlighter();

  if(yOffset < currYOffSet) {
    myNavBar.add();
  }
  else if(currYOffSet == yOffset){
    myNavBar.remove();
  }
}


var sectionOffsets = {};
$('section').each(function(){
  var key = $(this).attr('id');
  var offset = ( $(this).offset().top - 73)
  sectionOffsets[$(this).attr('id')] = offset;
})

function navHighlighter(){
  var currYOffSet = window.pageYOffset;
  if ( currYOffSet >= sectionOffsets['contact-section'] ){
    highlight('contact-section');
  } else if ( currYOffSet >= sectionOffsets['about-section']){
    highlight('about-section');
  } else if ( currYOffSet >= sectionOffsets['past-section']){
    highlight('past-section');
  } else if ( currYOffSet >= sectionOffsets['coming-soon-section']){
    highlight('coming-soon-section');
  } else if ( currYOffSet >= sectionOffsets['featured-section']){
    highlight('featured-section');
  } else {
    $('.nav-link').removeClass('nav-highlight');
  }
}

function highlight(sectionName){

  var itemName = "a[data-linked-item='#" + sectionName + "']"
  $('.nav-link').removeClass('nav-highlight');
  $(itemName).addClass('nav-highlight');
}