var ballin_octo = {};

ballin_octo.locations = [];
ballin_octo.circles = [];

ballin_octo.get_data = function() {
  $.getJSON("/user_location/", function( data ) {
    
    $.each(data, function(i) {
      ballin_octo.locations.push(data[i]);
    });
    
    ballin_octo.load_map();
  });
};

ballin_octo.load_map = function() {
  var center = ballin_octo.locations[0];
  var mapOptions = {
    center: new google.maps.LatLng(center["latitude"], center["longitude"]),
    zoom: 10
  };
  
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  
  for (var i = 0; i < ballin_octo.locations.length; i++) {
    var circle = ballin_octo.create_circle(map, ballin_octo.locations[i]);
    
    ballin_octo.circles.push(circle);
  }
};

ballin_octo.create_circle = function(map, loc) {
  var circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: new google.maps.LatLng(loc["latitude"], loc["longitude"]),
    radius: loc["accuracy"] * 1000
  };
      
  // Add the circle for this city to the map.
  circle = new google.maps.Circle(circleOptions);
      
  return circle;
}

$(document).ready(function () {
  ballin_octo.get_data();
});