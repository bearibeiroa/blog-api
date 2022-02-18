const rescue = require('express-rescue');
const { createToken } = require('../services/loginServices');
const { INVALID_FIELDS } = require('../errors/errorMessages');
const { BAD_REQUEST } = require('../errors/errorStatus');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await createToken(email, password);

  if (token.message) return res.status(BAD_REQUEST).json(INVALID_FIELDS);

  return res.status(200).json({ token });
});

module.exports = { userLogin };
