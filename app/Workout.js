var mongoose = require('mongoose');

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect('mongodb+srv://user:dummypassword@cluster0-nb8o7.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var workoutSchema = new Schema({
	email: String,
	workout: String,
	reps: Number,
	weight: Number,
	img: String
}, {collection: 'workouts', timestamps: true});

// export personSchema as a class called Person
module.exports = mongoose.model('Workout', workoutSchema);
