const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const router = require('./routes/routes.js');

const app = express();
const PORT = 1337;

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(router, '/');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});