var mongoose = require('mongoose');

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect('mongodb+srv://user:dummypassword@cluster0-nb8o7.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var workouttypeSchema = new Schema({
	name: String
    }, {
    	collection: 'workouttypes'
    });

// export personSchema as a class called Person
module.exports = mongoose.model('WorkoutType', workouttypeSchema);

