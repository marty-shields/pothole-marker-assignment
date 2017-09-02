// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//Using page callback for getting the database to show on a list
myApp.onPageInit('potholes', function (page) {
  //get the list element from the page and pas to vatriable
  var ul = document.getElementById('potholeList')
  //run method to refresh the potholes available
  getPotholeInfo();
  console.log("Results: " + results);

  //for loop to run through each pothole and show on a list
  for (var i = 0; i < results1.length; i++){
    //get the street and repair status
    var streetName = results1[i].street;
    var repairStatus = results1[i].status;
    console.log("street name: " + streetName);
    console.log("Repair Status: " + repairStatus);

    //set up item title for list
    var itemTitle = document.createElement('div');
    itemTitle.setAttribute("class", "item-title");
    itemTitle.innerHTML = streetName;

    //set up item after for list
    var itemAfter = document.createElement('div');
    itemAfter.setAttribute("class", "item-after");
    itemAfter.innerHTML = repairStatus;

    //set up item inner div for list
    var itemInner = document.createElement('div');
    itemInner.setAttribute("class", "item-inner");

    //set up the list element for list
    var li = document.createElement('li');
    li.setAttribute("class", "item-content");

    //bring the list together
    itemInner.appendChild(itemTitle);
    itemInner.appendChild(itemAfter);
    li.appendChild(itemInner);
    ul.appendChild(li);
  }
})

function getPotholeInfo(){
  //url for callback for api
  var url = 'http://localhost:3000/getpotholes?callback=?';

  //get the json
  $$.getJSON(url, null, function(data){
    results = JSON.stringify(data);
    results1 = data;
  });
};

getPotholeInfo();
var results;
var results1;
