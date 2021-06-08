const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
app.get('/', (req, res) => {
  res.send('I`m Alive!');
});

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
