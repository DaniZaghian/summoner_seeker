var mongoose = require("mongoose");

// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL || 
                      "mongodb://localhost/summoners" );

module.exports.PORT = require("./index.js");