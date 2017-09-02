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

//loop through the results
for (i = 0; i < results1.length; i++){
  var person = JSON.stringify(data[i]);
  console.log("person: " + person);
    var name = results1[i].name;
    var email = results1[i].email;
    var repair = results1[i].status;
    var long = results1[i].longitude;
    var lat = results1[i].latitude;
    var street = results1[i].street;
    var city = results1[i].city;
    var postcode = results1[i].postcode;

    //set up table row
    var tableRow = document.createElement('tr');

    //set up each table data with each of the results
    var tableName = document.createElement('td');
    tableName.innerHTML = name;

    var tableEmail = document.createElement('td');
    tableEmail.innerHTML = email;

    var tableRepair = document.createElement('td');
    tableRepair.innerHTML = repair;

    var tableLong = document.createElement('td');
    tableLong.innerHTML = long;

    var tableLat = document.createElement('td');
    tableLat.innerHTML = lat;

    var tableStreet = document.createElement('td');
    tableStreet.innerHTML = street;

    var tableCity = document.createElement('td');
    tableCity.innerHTML = city;

    var tablePostcode = document.createElement('td');
    tablePostcode.innerHTML = postcode;

    var tableEdit = document.createElement('td');
    tableEdit.innerHTML = "<button href='admin-detail.html' onclick='showDetails("+ person + ")' class='btn btn-sm btn-primary btn-block'>Edit</button>";

    //add each of the fields to the row
    tableRow.appendChild(tableName);
    tableRow.appendChild(tableEmail);
    tableRow.appendChild(tableRepair);
    tableRow.appendChild(tableLong);
    tableRow.appendChild(tableLat);
    tableRow.appendChild(tableStreet);
    tableRow.appendChild(tableCity);
    tableRow.appendChild(tablePostcode);
    tableRow.appendChild(tableEdit);

    //add the table row to the table body
    var tableBody = document.getElementById("list-table");
    tableBody.appendChild(tableRow);
  }
});

function showDetails(resultIn){
  sessionStorage.edit = JSON.stringify(resultIn);
  console.log(sessionStorage.edit);
  window.location = "../admin-detail.html";
}
