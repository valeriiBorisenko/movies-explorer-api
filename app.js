require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { routes } = require('./routes');
const limiter = require('./middlewares/rateLimit');
const err = require('./middlewares/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3005, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use('/', routes);
app.use(err);

app.use(errorLogger);
app.use(errors());

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log('Connected to bitfilmsdb');

  await app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`);
  });
}

main();
