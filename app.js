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
const { MONGO_URL } = require('./config');

const { PORT = 3005 } = process.env;
const app = express();

app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(err);

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
