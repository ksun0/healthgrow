var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mealSchema = new Schema({
	email: String,
	type: String, mealStr: String
    }, {
    	collection: 'meals',
    	timestamps: true});

module.exports = mongoose.model('Meal', mealSchema);

