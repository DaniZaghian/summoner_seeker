// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var db = require("./models");
var request = require('request');

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  //change to something actually secret
  secret: 'SuperSecretCookie',
  //30 minutes
  cookie: { maxAge: 30 * 60 * 1000 }
}));

app.get('/', function (req, res) {
  res.render("index");
});

//profile page

//if someone is logged in,
 //check who it is
 //
//otherwise, show them log in page
app.get('/profile/:sumName', function (req, res){
	if(req.session.userId){
		db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
			db.User.findOne({sumName: req.params.sumName}, function (err, foundUser) {
		    if (!foundUser){
		      console.log('database error: ', err);
		      res.render('usernotfound', {currentUser: currentUser});

		    } else {
		      // render profile template with user's data
		      console.log('founduser is: ' + foundUser);
		      console.log('currentuser is ' + currentUser);
		      res.render('profile', {user: foundUser, currentUser: currentUser});
		    }
	  		});
  		});
	}
	else {
		res.render('loggedout');
	}

});

app.get('/api/user/:sumName1', function (req, res){
  var sumName2 = req.params.sumName1;
  db.User.findOne({sumName: sumName2}, function(err, user){
    res.json(user);
  });
});

// login page
app.get('/login', function (req, res) {
  res.render('login');
});

// authenticate the user and set the session when loggin in
app.post('/sessions', function (req, res) {
  // call authenticate function to check if password user entered is correct
  db.User.authenticate(req.body.sumName, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log('authentication error: ', err);
      res.status(500).send();
    } else {
      console.log('setting sesstion user id ', loggedInUser._id);
      req.session.userId = loggedInUser._id;
      res.redirect('/profile/' + req.body.sumName);
    }
  });
});


app.get('/summoners', function (req, res) {
	if(req.session.userId){
		db.User.findOne({_id: req.session.userId}, function (err, foundUser) {
	    if (!foundUser){
	      console.log('database error: ', err);
	      res.send('User not found');
	    } else {
	    	db.User.find(function (err, allUsers){
		    // render profile template with user's data
		    res.render('summoners', {currentUser: foundUser, summoners: allUsers});
	      	});
	      }
  		});
	}
	else {
		res.render('loggedout');
	}

});

//when creating new user, create session
app.post('/api/users', function (req, res) {
	var newUser = req.body;
    db.User.createSecure(newUser, function(err, userData){
	    if (err) { return console.log("create error: " + err); }
	    console.log(userData);
	    req.session.userId = userData._id;
	    res.json(userData);
	});
  });

app.get('/api/users', function (req,res) {
  db.User.find(function(err, users){
    res.json(users);
  });
});

//when you hit logout, sets session to null and redirects to login
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.render('loggedout');
});


app.listen(process.env.PORT || 3000, function() {
  console.log("summoner seeker is running on port 3000");
});



