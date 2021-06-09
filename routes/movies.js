const express = require('express');

const moviesRoutes = express.Router();

moviesRoutes.get('/', '');
moviesRoutes.post('/', express.json(), '');
moviesRoutes.delete('/:_id', '');

exports.moviesRoutes = moviesRoutes;
