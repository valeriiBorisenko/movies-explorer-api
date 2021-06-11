const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badRequest-err');
const { JWT_SECRET } = require('../config');
const { errorMessage } = require('../utils.js/constants');

const { NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequestError(errorMessage.badRequestAuthorization);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new BadRequestError(errorMessage.badRequestAuthorization);
  }

  req.user = payload;

  next();
};
