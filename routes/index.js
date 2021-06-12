const express = require('express');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const { errorMessage } = require('../utils.js/constants');
const { joiAuth, joiLogin } = require('../middlewares/joi');

const routes = express.Router();

routes.post('/signup', express.json(), joiAuth, createUser);
routes.post('/signin', express.json(), joiLogin, login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.all('*', (req, res, next) => {
  next(new NotFoundError(errorMessage.linkFails));
});

exports.routes = routes;
