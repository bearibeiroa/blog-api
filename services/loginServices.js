const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = async (email) => {
  const result = await User.findOne({ where: { email } });
  console.log(result);

  if (!result) return { message: 'The email field not to be empty' };

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const data = {
    email,
    id: result.id,
  };

  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = { createToken }; 
