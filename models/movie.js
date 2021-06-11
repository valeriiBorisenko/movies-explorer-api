const mongoose = require('mongoose');
const { errorMessage, regularExpressions } = require('../utils.js/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return regularExpressions.test(url);
      },
      message: errorMessage.linkFails,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return regularExpressions.test(url);
      },
      message: errorMessage.linkFails,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return regularExpressions.test(url);
      },
      message: errorMessage.linkFails,
    },
  },
  owner: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
