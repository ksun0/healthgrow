var mongoose = require('mongoose');

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect('mongodb+srv://user:dummypassword@cluster0-nb8o7.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: String,
    password: String,
	name: String,
	points: String
}, {collection: 'users'});

// export userSchema as a class called User
module.exports = mongoose.model('User', userSchema);
