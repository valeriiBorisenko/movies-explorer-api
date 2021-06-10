const mongoose = require('mongoose');

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
        return /(http||https):\/\/(www\.)?[\w\S]*#?\./.test(url);
      },
      message: 'Ссылка не подходит',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(http||https):\/\/(www\.)?[\w\S]*#?\./.test(url);
      },
      message: 'Ссылка не подходит',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(http||https):\/\/(www\.)?[\w\S]*#?\./.test(url);
      },
      message: 'Ссылка не подходит',
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
