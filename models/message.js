var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	sender: String,
	subject: String,
	content: String
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;