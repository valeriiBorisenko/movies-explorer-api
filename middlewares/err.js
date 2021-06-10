const errorMessage = require('../utils.js/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? `${errorMessage.serverError}` : message });
  next();
};
