var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const challengeSchema = new Schema({
    model: {type: String, required: true }, // what model (e.g. workout, journal) achievement is associated with
    field: {type: String, required: true }, // what field for the model
    operator: { type: String, required: true }, // <, <=, >, >=, ==
    condition: { type: Number },
    pointValue: {type: Number, required: true }, // what field for the model
    timeBegin: { type: Date, required: true }, // <, <=, >, >=, ==
    timeExpire: { type: Date, required: true },
  }, {
    collection: 'challenges'
  });

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge
