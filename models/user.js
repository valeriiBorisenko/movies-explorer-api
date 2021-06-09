const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Необходимо указать почту'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильно указана почта',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль'],
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
