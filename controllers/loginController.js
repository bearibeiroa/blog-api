const rescue = require('express-rescue');
const { createToken } = require('../services/loginServices');
const { INVALID_FIELDS } = require('../errors/errorMessages');
const { BAD_REQUEST } = require('../errors/errorStatus');

const userLogin = rescue(async (req, res) => {
  const { email } = req.body;

  const result = await createToken(email);

  if (result.message) return res.status(BAD_REQUEST).json(INVALID_FIELDS);

    return res.status(200).json(result);
});

module.exports = { userLogin };
