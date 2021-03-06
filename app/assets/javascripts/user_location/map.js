var ballin_octo = {};

// map stuff
ballin_octo.locations = [];
ballin_octo.markers = [];

// google maps api stuff
ballin_octo.map = null;
ballin_octo.path = null;

// query attributes
ballin_octo.device = null;
ballin_octo.day = null;
ballin_octo.note = null;

// filter attributes
ballin_octo.marker_type = null;

ballin_octo.setup_controls = function() {
  $('#select_devices').change(function() {
    ballin_octo.device = this.value;
    
    // require both date and device to be filled in before we search
    if(!ballin_octo.device || ballin_octo.device === 'Select' ||
       !ballin_octo.day    || ballin_octo.day    === 'Select') {
      return;
    }
    
    ballin_octo.clear_map();
    ballin_octo.load_data();
  });
  
  $('#select_pull_day').change(function() {
    ballin_octo.day = this.value;
    
    // require both date and device to be filled in before we search
    if(!ballin_octo.device || ballin_octo.device === 'Select' ||
       !ballin_octo.day    || ballin_octo.day    === 'Select') {
      return;
    }
    
    ballin_octo.clear_map();
    ballin_octo.load_data();
  });
  
  $('#select_note').change(function() {
    ballin_octo.note = this.value;
    
    // require both date and device to be filled in before we search
    if(!ballin_octo.device || ballin_octo.device === 'Select' ||
       !ballin_octo.day    || ballin_octo.day    === 'Select') {
      return;
    }
    
    ballin_octo.clear_map();
    ballin_octo.load_data();
  });
  
  $('input[name=marker_type]:radio').change(function() {
    if($('#marker-dot').prop('checked')) {
      ballin_octo.marker_type = 'dot';
    } else {
      ballin_octo.marker_type = 'circle';
    }
    
    ballin_octo.clear_map();
    ballin_octo.add_markers(false);
  });
  
  $('#select_location_type').change(function() {
    ballin_octo.clear_map();
    ballin_octo.add_markers(false);
  });
};

ballin_octo.clear_map = function() {
  // remove old lines from map
  if(ballin_octo.path) {
    ballin_octo.path.setMap(null);
  }
  
  // remove markers
  for (var i = 0; i < ballin_octo.markers.length; i++) {
    ballin_octo.markers[i].setMap(null);
  }
  ballin_octo.markers = [];
};


ballin_octo.load_data = function() {  
  ballin_octo.locations = [];
  device = ballin_octo.device;
  day = ballin_octo.day;
  note = ballin_octo.note;
  
  var url = "/user_location/?device=" + device + "&day=" + encodeURIComponent(day);
  if(note && note.length > 0 && note != 'Select') {
    url += "&note=" + encodeURIComponent(note)
  }
  
  $.getJSON(url, function( data ) {  
    $.each(data, function(i) {
      ballin_octo.locations.push(data[i]);
    });
    
    ballin_octo.add_markers(true);
  });
};


ballin_octo.add_markers = function(recenter_map) {
  for (var i = 0; i < ballin_octo.locations.length; i++) {
    if(ballin_octo.should_include_location(ballin_octo.locations[i])) {
      var marker;
      if (ballin_octo.marker_type == 'circle') {
        marker = ballin_octo.create_circle(ballin_octo.map, ballin_octo.locations[i]);
        if(recenter_map && i == 0) {
          ballin_octo.recenter_map(marker.getCenter());
        }
      } else {
        marker = ballin_octo.create_point(ballin_octo.map, ballin_octo.locations[i]);
        if(recenter_map && i == 0) {
          ballin_octo.recenter_map(marker.getPosition());
        }
      }
    
      ballin_octo.markers.push(marker);
    }
  }
  // ballin_octo.add_new_path_between_markers();
};

ballin_octo.add_new_path_between_markers = function() {
  var points = $.map(ballin_octo.markers, function(marker, index) {
    if (marker instanceof google.maps.Circle) {
        return marker.getCenter();
    } else if (marker instanceof google.maps.Marker) {
      return marker.getPosition();
    }
  });
  
  var arrowSymbol = {
    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
  };
  
  ballin_octo.path = new google.maps.Polyline({
    path: points,
    geodesic: false,
    icons: [{
      icon: arrowSymbol,
      offset: '100%',
      repeat: '100px'
    }],
    strokeColor: '#A901DB',
    strokeWeight: 1.5
  });

  ballin_octo.path.setMap(ballin_octo.map);
}

ballin_octo.recenter_map = function(latLong) {
  var newOptions = {
    center: latLong,
    zoom: 19
  };
  
  ballin_octo.map.setOptions(newOptions);
}

ballin_octo.should_include_location = function(location) {
  type_filter = $('#select_location_type').val();
  if(type_filter == null || type_filter == 'All') {
    return true;
  }
  
  return location['provider_type'] == type_filter;
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
  if(location['provider_type'] == 'HighAccuracy') {
    return '#FF0000';
  } else if (location['provider_type'] == 'BalancedPower') {
    return '#FFFF00';
  } else if (location['provider_type'] == 'LowPower') {
    return '#00FF00';
  } else {
    return '#0000FF';
  }
};

ballin_octo.create_point = function(map, loc) {
  var point = new google.maps.Marker({
      position: new google.maps.LatLng(loc["latitude"], loc["longitude"]),
      map: map,
      title: loc["note"]
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