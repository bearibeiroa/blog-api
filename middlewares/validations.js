const {
  DISPLAY_NAME,
  EMAIL,
  EMAIL_REQUEST,
  PASSWORD,
  PASSWORD_REQUEST,
} = require('../errors/errorMessages');

const { BAD_REQUEST } = require('../errors/errorStatus');

const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) return res.status(BAD_REQUEST).json(DISPLAY_NAME);
  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

  if (!email || email === '') return res.status(BAD_REQUEST).json(EMAIL_REQUEST);
  if (!regex.test(email)) return res.status(BAD_REQUEST).json(EMAIL);
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') return res.status(BAD_REQUEST).json(PASSWORD_REQUEST);
  if (password.length !== 6) return res.status(BAD_REQUEST).json(PASSWORD);
  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
};
