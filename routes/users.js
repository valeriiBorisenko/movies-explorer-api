const express = require('express');
const { getUser, updateUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUser);
usersRoutes.patch('/me', express.json(), updateUser);

exports.usersRoutes = usersRoutes;
