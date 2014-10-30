$(document).ready(function(){
   // cache the window object
   $window = $(window);
 
   $('section[data-type="background"]').each(function(){
     // declare the variable to affect the defined data-type
     var $scroll = $(this);
                     
      $(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                             
        var yPos = -($window.scrollTop() / $scroll.data('speed')); 
         
        // background position
        var coords = yPos + 'px';
 
        // move the background
        $scroll.css({ backgroundPositionY: coords });    
      }); // end window scroll
   });  // end section function
    
    $(window).trigger('scroll');
}); // close out script