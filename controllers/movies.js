const Movie = require('../models/movie');
const ValidationError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const { errorMessage } = require('../utils.js/constants');

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.find({});

    res.send(movie);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const owner = req.user._id;

    res.send(
      await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      }),
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(errorMessage.validationCreatMovie));
    } else {
      next(err);
    }
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(new Error('NotFoundError'));
    if (movie.owner === req.user._id) {
      res.send(await movie.remove());
    } else {
      throw new ForbiddenError(errorMessage.notValidIdDeleteMovie);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError(errorMessage.validationDeleteMovie));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError(errorMessage.notFoundMovie));
    } else {
      next(err);
    }
  }
};
