const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/not-found-err');
const MongoError = require('../errors/not-found-err');
const BadRequestError = require('../errors/not-found-err');
const { errorMessage } = require('../utils.js/constants');

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
      next(new ValidationError(errorMessage.validationCreateUser));
    } else if (err.name === 'MongoError' && err.code === 11000) {
      next(new MongoError(errorMessage.mongoCreateUser));
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
      throw new BadRequestError(errorMessage.badRequestLoginUser);
    }
  } catch (err) {
    if (err.message === 'BadRequest') {
      next(new BadRequestError(errorMessage.badRequestLoginUser));
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
      throw new NotFoundError(errorMessage.notFoundUser);
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
      next(new ValidationError(errorMessage.validationUpdateUser));
    } else if (err.message === 'CastError') {
      next(new NotFoundError(errorMessage.notFoundUser));
    } else {
      next(err);
    }
  }
};
