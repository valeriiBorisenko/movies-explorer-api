const errorMessage = {
  ValidationErrorCreateUser: 'Переданы некорректные данные при создании пользователя',
  MongoErrorCreateUser: 'Пользователь с переданным email уже существует',
  BadRequestErrorLoginUser: 'Неправильные email или пароль',
  NotFoundErrorUser: 'Пользователь с указанным _id не найден',
  ValidationErrorUpdateUser: 'Переданы некорректные данные при обновлении пользователя',
};

module.exports = errorMessage;
