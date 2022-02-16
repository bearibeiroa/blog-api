const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

app
  .route('/user')
  .post(userController.createUser);

  app
  .route('/login')
  .post(loginController.loginUser);

module.exports = app;
