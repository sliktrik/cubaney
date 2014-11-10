$(document).ready(function(){
    
   $window = $(window);
 
   $('section[data-type="background"]').each(function(){
     var $scroll = $(this);
                     
      $(window).scroll(function() {                             
        var yPos = -($window.scrollTop() / $scroll.data('speed')); 
        var coords = yPos + 'px';
          
        $scroll.css({ backgroundPositionY: coords });    
      });
   });
    
    $(window).trigger('scroll');
    
    google.maps.event.addDomListener(window, 'load', init);
    
    scrollNav();

});

function init() {
    
    var initialLocation = new google.maps.LatLng(-33.8674869, 151.2069902);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });
    }
    
    var mapOptions = {
        zoom: 11,
        center: initialLocation, 
        styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}]
    };
    
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
}

function scrollNav() {
  $('nav a').click(function(){  
    //Toggle Class
    $(".active").removeClass("active");      
    $(this).closest('li').addClass("active");
    var theClass = $(this).attr("class");
    $('.'+theClass).parent('li').addClass('active');
    //Animate
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 75
    }, 400);
    return false;
  });
  $('.scrollTop a').scrollTop();
}
