const express = require('express');

const usersRoutes = express.Router();

usersRoutes.get('/users/me', '');
usersRoutes.patch('/users/me', express.json(), '');

exports.usersRoutes = usersRoutes;
