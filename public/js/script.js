var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
	$("#estimate").click(showRoute);

	autocomplete();
}

$(document).ready(loadPag);

//show map
var good = function(pos){
	var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);
    var mapa = document.getElementById("map");
    mapa.style.height = "100vh";
    mapa.style.width = "100vw";

  	var myOptions = {
	    center:latlon,
	    zoom:14,
	    mapTypeId:google.maps.MapTypeId.ROADMAP,
	    mapTypeControl:false,

	    navigationControlOptions:{
	    	style: google.maps.NavigationControlStyle.SMALL
	   	}
    };
    
    var map = new google.maps.Map(document.getElementById("map"), myOptions);


}
var error = function(error){
	console.log(error);
}

//show route
var showRoute = function(){
	var directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
      		strokeColor: "#9194a1"
    	}
	});
	var directionsService = new google.maps.DirectionsService();

	var mapOptions = {
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var request = {
		origin: $('#startPoint').val(),
		destination: $('#endPoint').val(),
		travelMode: google.maps.TravelMode.DRIVING
	};

    //supresss initial a to b marker
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

    // geocoder  origin function , this convert the input.val to cordinates
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"address": request.origin}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latOr = results[0].geometry.location.lat();
            longOr = results[0].geometry.location.lng();
            origLatlon = new google.maps.LatLng(latOr, longOr);
            console.log(latOr, longOr);
            // change marker
            var image = '../img/origin.png';
            var marker = new google.maps.Marker({
                position: origLatlon,
                map: map,
                icon: image
            });
        }
    });

    // geocoder  destination function , this convert the input.val to cordinates
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"address": request.destination}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latOr = results[0].geometry.location.lat();
            longOr = results[0].geometry.location.lng();
            origLatlon = new google.maps.LatLng(latOr, longOr);
            console.log(latOr, longOr);
            // change marker
            var image = '../img/destination.png';
            var marker = new google.maps.Marker({
                position: origLatlon,
                map: map,
                icon: image
            });
        }
    });


	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("route"));

	directionsService.route(request, function(result, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
  		}
	});
}

//show the predict
var autocomplete = function() {
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(40.802089, -124.163751)
	);

	var origin_input = document.getElementById('startPoint');
	var destination_input = document.getElementById('endPoint');

	var options = {
		bounds: defaultBounds
	};

	var autocomplete_origin = new google.maps.places.Autocomplete(origin_input, options);    
	var autocomplete_destination = new google.maps.places.Autocomplete(destination_input, options);
}

