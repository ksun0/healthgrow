const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer, 
    required: true },
  level: {
    type: Number, 
    required: true}
}, {
  timestamps: true,
});

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;