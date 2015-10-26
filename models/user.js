var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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

//need to add sumname, email and password on 3rd page



// define user model
var User = mongoose.model('User', UserSchema);


module.exports = User;

