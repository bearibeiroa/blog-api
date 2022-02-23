const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/userServices');
const { UNAUTHORIZED } = require('../errors/errorStatus');
const { TOKEN_NOT_FOUND, INVALID_TOKEN } = require('../errors/errorMessages');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(UNAUTHORIZED).json(TOKEN_NOT_FOUND);
  }
  try {
    const decoded = jwt.verify(authorization, secret);
    console.log('aqui decoded:', decoded);
    const userEmail = await getUserByEmail(decoded.email);
    if (!userEmail) {
      return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
    }
    req.bia = decoded;
  } catch (err) {
    return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
  }
  next();
};

module.exports = { authentication };
