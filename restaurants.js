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
    //draw a marker
    var myMarker = new google.maps.Marker({map: map, position: pos});
    getNearByRestaurants(lat, lon);
    return;
}

function handleGeolocateError(){
    alert('Sorry could not get your geolocation');
}

function getNearByRestaurants(lat, lng){
    console.log("LAT = "+lat);
    console.log("LNG = "+lng);
    $.ajax({
         url: 'query.php?lat='+lat+'&lon='+lng
         ,dataType : 'json'
         ,success : ajaxSuccess
    });
}

function ajaxSuccess(data){
    data.forEach(function(restaurant){
        var pos = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
        var marker = new google.maps.Marker({map: map, position: pos});
    });
}

window.onload = init;
