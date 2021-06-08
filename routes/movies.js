const express = require('express');

const moviesRoutes = express.Router();

moviesRoutes.get('/movies', '');
moviesRoutes.post('/movies', express.json(), '');
moviesRoutes.delete('/movies/:_id', '');

exports.moviesRoutes = moviesRoutes;
