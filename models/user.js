var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// define user schema
var UserSchema = new Schema({
  roles: [String],
  prefRoles: [String],
  rank: String,
  teemo: String,
  toxic: Number,
  bio: String,
  sumName: String,
  sumId: Number,
  email: String,
  passwordDigest: String
});

UserSchema.statics.createSecure = function (newUser, callback) {
  
  var UserModel = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(newUser.password, salt, function (err, hash) {

      // create the new user (save to db) with hashed password
      UserModel.create({
        roles: newUser.roles,
        prefRoles: newUser.prefRoles,
        rank: newUser.rank,
        teemo: newUser.teemo,
        toxic: newUser.toxic,
        bio: newUser.bio,
        sumName: newUser.sumName,
        sumId: newUser.sumId,
        email: newUser.email,
        passwordDigest: hash
      }, callback);
    });
  });
};


// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (sumName, password, callback) {
  // find user by email entered at log in
  this.findOne({sumName: sumName}, function (err, foundUser) {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with summoner name ' + sumName);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    // if we found a user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

//need to add sumname, email and password on 3rd page

// define user model
var User = mongoose.model('User', UserSchema);


module.exports = User;

