var mongoose = require('mongoose');

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect('mongodb+srv://user:dummypassword@cluster0-nb8o7.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var challengeSchema = new Schema({
	model: String,
	operator: String,
	condition: Number,
	field: String, 
	pointValue: Number, 
	timeBegin: Date, 
	timeExpire: Date
    }, {
    	collection: 'challenges'
    });

// export personSchema as a class called Person
module.exports = mongoose.model('Challenge', challengeSchema);

