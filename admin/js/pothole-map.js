var results1;
var results;
var i;
//url for callback for api
var url = 'http://localhost:3000/getpotholes?callback=?';

//get the json
$.getJSON(url, null, function(data){
results = JSON.stringify(data);
results1 = data;

console.log("results: " + results);
console.log("results1: " + results1);

});

//set up google map
function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    var marker;
    var delay=400; //0.4secs

    setTimeout(function() {
      //run through loop of lat langfs and add them as markers
      for(i = 0; i < results1.length; i++){
        var person = JSON.stringify(results1[i])

        //get the marker first
        var latlng = new google.maps.LatLng(results1[i].latitude, results1[i].longitude);
        bounds.extend(latlng);

        //create a custom window content
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h4 id="firstHeading" class="firstHeading">'+ results1[i].street +'</h4>'+
        '<h4 id="firstHeading" class="firstHeading">'+ results1[i].city +'</h4>'+
        '<h4 id="firstHeading" class="firstHeading">'+ results1[i].postcode +'</h4>'+
        '<div id="bodyContent">'+
        '<p>Reported By: <strong>'+ results1[i].name +'</strong></p>'+
        '<p>Current Repair Status: <strong>'+ results1[i].status +'</strong></p>'+
        "<button id='editButton' href='admin-detail.html' onclick='showDetails("+ person + ")' class='btn btn-sm btn-primary btn-block'>Edit</button>"+
        '</div>'+
        '</div>';


        //place thne marker on the map
        marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: results1[i].street
        });

        //event listener for info window
        google.maps.event.addListener(marker, 'click', (function(mm, tt) {
        return function() {
            infowindow.setContent(tt);
            infowindow.open(map, mm);
        }
      })(marker, contentString));
    }
    map.fitBounds(bounds);
  }, delay);
}


function showDetails(resultIn){
  sessionStorage.edit = JSON.stringify(resultIn);
  console.log(sessionStorage.edit);
  window.location = "../admin-detail.html";
}
