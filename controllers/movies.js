const Movie = require('../models/movie');
const ValidationError = require('../errors/not-found-err');
const NotValidIdError = require('../errors/not-validId-err');
const NotFoundError = require('../errors/not-found-err');

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
      next(new ValidationError('Переданы некорректные данные при создании фильма'));
    } else {
      next(err);
    }
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(new Error('NotFoundError'));
    if (movie.owner === req.user._id) {
      res.send(await movie.delete());
    } else {
      throw new NotValidIdError('Нет прав к удалению фильма');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные для удаления фильма'));
    } else if (err.message === 'NotFoundError') {
      next(new NotFoundError('Фильм с указанным _id не найден'));
    } else {
      next(err);
    }
  }
};
