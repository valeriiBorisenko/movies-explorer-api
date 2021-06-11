const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessage } = require('../utils.js/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, errorMessage.requiredEmail],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: errorMessage.notValidEmail,
    },
  },
  password: {
    type: String,
    required: [true, errorMessage.requiredPassword],
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
