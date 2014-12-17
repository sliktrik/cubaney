// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)

var ICON = new google.maps.MarkerImage('img/map-icon.svg', null, null,
    new google.maps.Point(14, 13));

var SHADOW = new google.maps.MarkerImage('img/medicare-shadow.png', null, null,
    new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
    
    var initialLocation = new google.maps.LatLng(-33.8674869, 151.2069902);
    
    /*if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });
    }*/
    
    var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        center: initialLocation, 
        panControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        
        styles: [
            {
                "stylers": [
                    {
                        "hue": "#ff1a00"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 33
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            }
        ]
    };
    
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: ICON,
      shadow: SHADOW,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  var infoBubble = new InfoBubble;
  view.getInfoWindow = function(store) {
    if (!store) {
      return infoBubble;
    }

    var details = store.getDetails();

    var html = ['<div class="store"><div class="title">', details.title,
      '</div><div class="address">', details.address, '</div>',
      '<div class="hours misc">', details.hours, '</div></div>'].join('');

    infoBubble.setContent($(html)[0]);
    return infoBubble;
  };

  new storeLocator.Panel(panelDiv, {
    view: view
  });
});