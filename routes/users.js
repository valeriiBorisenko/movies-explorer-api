const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { joiUserDataUpdate } = require('../middlewares/joi');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUser);
usersRoutes.patch('/me', express.json(), joiUserDataUpdate, updateUser);

exports.usersRoutes = usersRoutes;
