var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var moodSchema = new Schema({
	email: String,
    rating: Number,
    tags: [String],
	text: String
    }, {timestamps: true});

// export 

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;