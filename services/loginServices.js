const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = async (email) => {
  const result = await User.findOne({ where: { email } });

  if (!result) return { message: 'Is not a email' };

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const data = {
    email,
  };

  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = { createToken }; 
