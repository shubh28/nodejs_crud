var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : String,
	email : String,
	userName : String,
	password : String
});

module.exports = mongoose.model('User',UserSchema);