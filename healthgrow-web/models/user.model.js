const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScehma = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {type: String, required: true },
  name: { type: String },
  isadmin: {type: Boolean},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userScehma);

module.exports = User;