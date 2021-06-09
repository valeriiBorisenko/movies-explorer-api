const express = require('express');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const errorMessage = require('../utils.js/constants');

const routes = express.Router();

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.get('*', (req, res, next) => {
  next(new NotFoundError(errorMessage.notFoundUrl));
});

exports.routes = routes;
