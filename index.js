const express = require('express');

require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userRouter = require('./routers/userRoute');
const loginRouter = require('./routers/loginRoute');

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
