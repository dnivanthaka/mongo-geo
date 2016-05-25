var mapContainer = document.getElementById('map');
var map;

function init(){
    //Google map settings
    var mapOptions = {
        zoom: 16,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(mapContainer, mapOptions);
    detectLocation();
}

function detectLocation(){
    var options = {
        enableHighAccuracy: true,
        maximumAge:         1000,
        timeout:            30000
    };
    
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(
            drawLocationOnMap,
            handleGeolocateError,
            options
        );
        
    }else{
        alert('Sorry your browser does not seem to support geolocation');
    }
    
}

//Callback function of getCurrentPosition(), pinpoints location on Google map
function drawLocationOnMap(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    
    var msg = "You are here: Latitude "+lat+", Longitude "+lon;
    var pos = new google.maps.LatLng(lat, lon);
    var infoBox = new google.maps.InfoWindow({map: map, position: pos, content: msg});
    map.setCenter(pos);
    return;
}

function handleGeolocateError(){
    alert('Sorry could not get your geolocation');
}

window.onload = init;
