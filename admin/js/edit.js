var test;

$(document).ready(function(){
  if (sessionStorage.edit){
    var details = sessionStorage.edit;
    test = JSON.parse(details)
    console.log("details: " + details);
    console.log("test: " + test.name);


    document.getElementById("name").value = test.name;
    document.getElementById("email").value = test.email;
    document.getElementById("status").value = test.status;
    document.getElementById("latitude").value = test.latitude;
    document.getElementById("longitude").value = test.longitude;
    document.getElementById("street").value = test.street;
    document.getElementById("city").value = test.city;
    document.getElementById("postcode").value = test.postcode;
  }
  else{
    window.location = "../admin-list.html";
  }
});

function savePothole(){

  //remove the original first before adding the second
  var removeFrom = {
    name : test.name,
    email : test.email,
    repair : test.status,
    longitude : test.longitude,
    latitude : test.latitude,
    street : test.street,
    city : test.city,
    postcode : test.postcode
  }
  //remove original first
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/edit',
    data: removeFrom,
    success: function(cb){
      console.log('sent data to server');
      console.log(cb);
    },
    error: function(){
      console.log('error');
    }
  });

  var value = {
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    repair : document.getElementById("status").value,
    longitude : document.getElementById("longitude").value,
    latitude : document.getElementById("latitude").value,
    street : document.getElementById("street").value,
    city : document.getElementById("city").value,
    postcode : document.getElementById("postcode").value
  }
  //send object to api
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/pothole',
    data: value,
    success: function(cb){
      console.log('sent data to server');
      console.log(cb);
      alert("Pothole modified successfully");
      window.location = "../admin-list.html";
    },
    error: function(){
      console.log('error');
    }
  });
}

//function to remove the potholes
function deletePothole(){
  var removeFrom = {
    name : test.name,
    email : test.email,
    repair : test.status,
    longitude : test.longitude,
    latitude : test.latitude,
    street : test.street,
    city : test.city,
    postcode : test.postcode
  }
  //remove original first
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/edit',
    data: removeFrom,
    success: function(cb){
      console.log('sent data to server');
      console.log(cb);
      alert("Pothole removed successfully");
      window.location = "../admin-list.html";
    },
    error: function(){
      console.log('error');
    }
  });
}
