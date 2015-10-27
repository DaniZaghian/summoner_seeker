// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.render("index");
});

//profile page
app.get('/profile', function (req, res){
  res.render("profile");
});

app.get('/api/user/:sumName1', function (req, res){
  var sumName2 = req.params.sumName1;
  db.User.findOne({sumName: sumName2}, function(err, user){
    res.json(user);
  });
});


app.post('/api/users', function (req, res) {
	var newUser = req.body;
    db.User.create(newUser, function(err, userData){
	    if (err) { return console.log("create error: " + err); }
	    console.log(userData);
	    res.json(userData);
	});
  });


app.listen(process.env.PORT || 3000, function() {
  console.log("summoner seeker is running on port 3000");
});



