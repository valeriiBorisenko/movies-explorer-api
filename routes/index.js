const express = require('express');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

const { usersRoutes } = require('./users');
const { createUser, login } = require('../controllers/users');

const routes = express.Router();

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);

routes.use(auth);

routes.use('/users', usersRoutes);

routes.get('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

exports.routes = routes;
