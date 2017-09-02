function insertLocation(){
  if (navigator.geolocation){
    //get and watch depending on what you want to do
    navigator.geolocation.getCurrentPosition(showPosition);
    //navigator.geolocation.watchPosition(showPosition);
  }
  else {
    myApp.alert("Geolocation is not supported", "Error!")
  }

  function showPosition(position){
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    document.getElementById('lat').value = Number(position.coords.latitude);
    document.getElementById('long').value = Number(position.coords.longitude);
  }
}

function saveLocation(){
  //vatriables for fields for ease of use
  var nameField = document.getElementById("name").value
  var emailField = document.getElementById("email").value
  var repairField = document.getElementById("repair").value
  var longField = document.getElementById("long").value
  var latField = document.getElementById("lat").value
  console.log(latField);
  console.log(longField);

  //check to make sure all fields are filled in
  if (nameField != "" && emailField != "" && repairField != "" && longField != "" && latField != "" ){
    //email validation
    var atpos = emailField.indexOf("@");
    var dotpos = emailField.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailField.length){
      myApp.alert("Not a valid email", "Error!");
    }
    else {
      //validation for numbers for long and latitude values
      if (!isNaN(longField) && !isNaN(latField)){

        var value;

        //get location from long lat values using googles api
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latField, longField);

        //google api function call
        geocoder.geocode(
          //saving the lat and lang as an object to send to google
          {'latLng': latlng},
          //send out the information we need and get back the information from google
          function(results, status) {
            //make sure googles geocoder is online
            if (status == google.maps.GeocoderStatus.OK) {
              //make sure we have a result
              if (results[0]) {
                //get formatted address from result to pick out certain parts
                var add = results[0].formatted_address ;
                var value=add.split(",");

                //get city and street
                count = value.length;
                var cityadd = value[count-3];
                cityadd = cityadd.substr(1);
                var streetadd = value[0];
                console.log("city name is: " + cityadd);
                console.log("state name is: " + streetadd);
                console.log("country name is: " + add);

                //get postcode
                var add1 = results[0].address_components;
                var postc = add1[add1.length - 1].long_name;
                console.log("add comp is: " + JSON.stringify(add1));
                console.log("postcode is: " + postc);

                //create object of results
                value = {name : nameField,
                            email : emailField,
                            repair : repairField,
                            longitude : longField,
                            latitude : latField,
                            street : streetadd,
                            city : cityadd,
                            postcode : postc};

                //send object to api
                $.ajax({
                  type: 'POST',
                  url: 'http://localhost:3000/pothole',
                  data: value,
                  success: function(cb){
                    console.log('sent data to server');
                    console.log(cb);
                  },
                  error: function(){
                    console.log('error');
                  }
                });
                getPotholeInfo();
              }
              else  {
                console.log("address not found");
              }
            }
            else {
              console.log("Geocoder failed due to: " + status);
            }
          }
        );

        //reporting and cleanup
        myApp.alert("Details Saved", "Success!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("repair").value = "";
        document.getElementById("long").value = "";
        document.getElementById("lat").value = "";
      }
      else {
        myApp.alert("Longitude or Latitude values are not valid numbers", "Error!");
      }
    }
  }
  else {
    myApp.alert("Please fill in all fields", "Error!");
  }
}
