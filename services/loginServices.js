const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = async (email, password) => {
  const result = await User.findOne({ where: { email, password } });
    // console.log(result.dataValues);
  if (!result) return { message: 'The email field not to be empty' };

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(result.dataValues, secret, jwtConfig);
  console.log(token);
  return token;
};

module.exports = { createToken }; 
