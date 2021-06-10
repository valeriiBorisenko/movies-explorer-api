const errorMessage = {
  validationCreateUser: 'Переданы некорректные данные при создании пользователя',
  mongoCreateUser: 'Пользователь с переданным email уже существует',
  badRequestLoginUser: 'Неправильные email или пароль',
  notFoundUser: 'Пользователь с указанным _id не найден',
  validationUpdateUser: 'Переданы некорректные данные при обновлении пользователя',

  validationCreatMovie: 'Переданы некорректные данные при создании фильма',
  notValidIdDeleteMovie: 'Нет прав на удаление фильма',
  validationDeleteMovie: 'Переданы некорректные данные для удаления фильма',
  notFoundMovie: 'Фильм с указанным _id не найден',

  notFoundUrl: 'Запрашиваемый ресурс не найден',
  serverError: 'На сервере произошла ошибка',
  linkFails: 'Ссылка не подходит',
  badRequestAuthorization: 'Необходима авторизация',
};

module.exports = errorMessage;
