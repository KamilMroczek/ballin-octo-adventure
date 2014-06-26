var ballin_octo = {};

ballin_octo.locations = [];
ballin_octo.markers = [];
ballin_octo.map = null;
ballin_octo.marker_type = null;

ballin_octo.setup_controls = function() {
  $('#select_devices').change(function() {
    ballin_octo.remove_markers_from_map();
    ballin_octo.load_data(this.value);
  });
  
  $('input[name=marker_type]:radio').change(function() {
    if($('#marker-dot').prop('checked')) {
      ballin_octo.marker_type = 'dot';
    } else {
      ballin_octo.marker_type = 'circle';
    }
    
    ballin_octo.remove_markers_from_map();
    ballin_octo.add_markers(null);
  });
  
  $('#select_location_type').change(function() {
    ballin_octo.remove_markers_from_map();
    ballin_octo.add_markers(this.value);
  });
};

ballin_octo.remove_markers_from_map = function() {
  for (var i = 0; i < ballin_octo.markers.length; i++) {
    ballin_octo.markers[i].setMap(null);
  }
  ballin_octo.markers = [];
};


ballin_octo.load_data = function(device) {
  ballin_octo.locations = [];
  
  $.getJSON("/user_location/?device=" + device, function( data ) {  
    $.each(data, function(i) {
      ballin_octo.locations.push(data[i]);
    });
    
    ballin_octo.add_markers(null);
  });
};


ballin_octo.add_markers = function(type_filter) {
  for (var i = 0; i < ballin_octo.locations.length; i++) {
    if(ballin_octo.should_include_location(ballin_octo.locations[i], type_filter)) {
      var marker;
      if (ballin_octo.marker_type == 'circle') {
        marker = ballin_octo.create_circle(ballin_octo.map, ballin_octo.locations[i]);
        if(i == 0) {
          ballin_octo.recenter_map(marker.getCenter());
        }
      } else {
        marker = ballin_octo.create_point(ballin_octo.map, ballin_octo.locations[i]);
        if(i == 0) {
          ballin_octo.recenter_map(marker.getPosition());
        }
      }
    
      ballin_octo.markers.push(marker);
    }
  }
};

ballin_octo.recenter_map = function(latLong) {
  var newOptions = {
    center: latLong,
    zoom: 19
  };
  
  ballin_octo.map.setOptions(newOptions);
}

ballin_octo.should_include_location = function(location, type_filter) {
  if(type_filter == null || type_filter == 'All') {
    return true;
  }
  
  switch(type_filter) {
    case 'Both':
      return location['gps_on'] || location['network_on']
      break;
    case 'GPS':
      return location['gps_on']
      break;
    case 'Network':
      return location['network_on']
      break;
    case 'Neither':
      return !(location['gps_on'] || location['network_on'])
      break;
    default:
      return false;
  }
};

ballin_octo.create_circle = function(map, loc) {
  var colour = ballin_octo.select_colour(loc);
  
  var circleOptions = {
    strokeColor: colour,
    strokeOpacity: 0.35,
    strokeWeight: 1,
    fillColor: colour,
    fillOpacity: 0.15,
    map: map,
    center: new google.maps.LatLng(loc["latitude"], loc["longitude"]),
    radius: loc["accuracy"]
  };
      
  // Add the circle for this city to the map.
  circle = new google.maps.Circle(circleOptions);
      
  return circle;
};

ballin_octo.select_colour = function (location) {
  if(location['gps_on'] && location['network_on']) {
    return '#FF0000';
  } else if (location['gps_on']) {
    return '#00FF00';
  } else if (location['network_on']) {
    return '#0000FF';
  } else { // no network and no gps
    return '#000000';
  }
};

ballin_octo.create_point = function(map, loc) {
  var point = new google.maps.Marker({
      position: new google.maps.LatLng(loc["latitude"], loc["longitude"]),
      map: map
  });
  
  return point;
};

ballin_octo.create_map = function () {
  var mapOptions = {
    center: new google.maps.LatLng(34.111, -118.111),
    zoom: 12
  };
  
  ballin_octo.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};

$(document).ready(function () {
  ballin_octo.marker_type = 'circle';
  
  ballin_octo.create_map();
  ballin_octo.setup_controls();
});