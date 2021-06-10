const express = require('express');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');
const { joiMovieData, joiMovieId } = require('../middlewares/joi');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovie);
moviesRoutes.post('/', express.json(), joiMovieData, createMovie);
moviesRoutes.delete('/:movieId', joiMovieId, deleteMovie);

exports.moviesRoutes = moviesRoutes;
