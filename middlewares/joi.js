const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const errorMessage = require('../utils.js/constants');

exports.joiAuth = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

exports.joiLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

exports.joiUserDataUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

exports.joiMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, dissalow_auth: true })) {
        return value;
      } return helpers.message(errorMessage.linkFails);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, dissalow_auth: true })) {
        return value;
      } return helpers.message(errorMessage.linkFails);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, dissalow_auth: true })) {
        return value;
      } return helpers.message(errorMessage.linkFails);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

exports.joiMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});
