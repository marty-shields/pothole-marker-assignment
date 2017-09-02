 //sq lite start
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('potholesDB');
var db2 = new sqlite3.Database('loginDB')

//create database if it dont already exists
db.serialize(function(){
  db.run("CREATE TABLE IF NOT EXISTS potholes (name TEXT, email TEXT, status TEXT, longitude INTEGER, latitude INTEGER, street TEXT, city TEXT, postcode TEXT)");
});

//create database if it dont already exists
db2.serialize(function(){
  db2.run("CREATE TABLE IF NOT EXISTS login (email TEXT, password TEXT)");
});


var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//save a new pothole
app.post('/pothole', function(req, res){
  console.log(req.body);
  console.log(req.body.name);

  //delete all for debugging
  //db.run("DELETE FROM potholes");

  db.run("INSERT INTO potholes (name, email, status, longitude, latitude, street, city, postcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  req.body.name, req.body.email, req.body.repair, req.body.longitude, req.body.latitude, req.body.street, req.body.city, req.body.postcode);

  res.send("success");
});

//get all potholes back
app.get('/getpotholes', function(req, res){
  db.all("SELECT * FROM potholes", function(err, rows){
    res.jsonp(rows);
  });
});

//get all potholes back
app.post('/login', function(req, res){
    //get VALUES
    var loginUse = req.body.email;
    var loginPass = req.body.password;
    console.log(loginUse);
    console.log(loginPass);

    db2.all("SELECT email FROM login WHERE (email = '"+loginUse+"') AND (password = '"+loginPass+"')", function(err, answer){

      //check to see if theres any results
      if(answer.length > 0)
      {
        //check object recieved
        var answer = JSON.stringify(answer)
        res.send(true);
      }
      else{
        res.send(false);
      }
    });

    //res.send("sucess");
});

//delete a pothole
app.post('/edit', function(req, res){
  console.log(req.body);
  console.log(req.body.name);

  //delete all for debugging
  //db.run("DELETE FROM potholes");

  db.all("DELETE FROM potholes WHERE (name = '"+req.body.name+"') AND " +
  "(email = '"+req.body.email+"') AND (status = '"+req.body.repair+"') AND " +
  "(longitude = '"+req.body.longitude+"') AND (latitude = '"+req.body.latitude+"') AND " +
  "(street = '"+req.body.street+"') AND (city = '"+req.body.city+"') AND " +
  "(postcode = '"+req.body.postcode+"')");

  res.send("success");
});

app.listen(3000);
console.log("running");
