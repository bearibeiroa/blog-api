const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRouter = require('./routers/userRoute');

app.use(bodyParser.json());

app.use('/', userRouter);

module.exports = app;  
