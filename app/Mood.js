var mongoose = require('mongoose');

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect('mongodb+srv://user:dummypassword@cluster0-nb8o7.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var moodSchema = new Schema({
	email: String,
    rating: Number,
    tags: [String],
	text: String
    }, {timestamps: true});

// export 
module.exports = mongoose.model('Mood', moodSchema);