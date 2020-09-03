var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const workoutSchema = new Schema({
    email: {type: String, required: true },
    workout: { type: String, required: true },
    reps: { type: Number },
    weight: { type: Number },
    img: { data: Buffer, contentType: String },
  }, {
    timestamps: true,
  });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout