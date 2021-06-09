const express = require('express');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovie);
moviesRoutes.post('/', express.json(), createMovie);
moviesRoutes.delete('/:movieId', deleteMovie);

exports.moviesRoutes = moviesRoutes;
