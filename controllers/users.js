const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/not-found-err');
const MongoError = require('../errors/not-found-err');
const BadRequestError = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });

    res.status(200).send({ ...user._doc, password: undefined, __v: undefined });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else if (err.name === 'MongoError' && err.code === 11000) {
      next(new MongoError('Пользователь с переданным email уже существует'));
    } else {
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(new Error('BadRequest'));
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({
        token, password: undefined, __v: undefined,
      });
    } else {
      throw new BadRequestError('Не правильный email или пароль');
    }
  } catch (err) {
    if (err.message === 'BadRequest') {
      next(new BadRequestError('Неправильные email или пароль'));
    } else {
      next(err);
    }
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    const owner = await users.filter((user) => user.id === req.user._id);
    const ownerId = await owner.some((item) => item.id === req.user._id);
    if (ownerId) {
      res.status(200).send(...owner);
    } else {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true }).orFail(new Error('CastError'));

    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
    } else if (err.message === 'CastError') {
      next(new NotFoundError('Пользователь с указанным _id не найден'));
    } else {
      next(err);
    }
  }
};
