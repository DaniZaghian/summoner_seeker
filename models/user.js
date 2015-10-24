var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// define user schema
var UserSchema = new Schema({
  roles: [String],
  prefRoles: [String],
  rank: String,
  teemo: Boolean,
  toxic: Number,
  bio: String,
  username: String,
  summId: Number,
  email: String,
  passwordDigest: String
});



// define user model
var User = mongoose.model('User', UserSchema);


module.exports = User;

