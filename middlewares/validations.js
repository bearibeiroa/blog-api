const {
  DISPLAY_NAME,
  EMAIL,
  EMAIL_REQUEST,
  PASSWORD,
  PASSWORD_REQUEST,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  NAME_REQUIRED,
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

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') return res.status(BAD_REQUEST).json(EMPTY_EMAIL);
  if (password === '') return res.status(BAD_REQUEST).json(EMPTY_PASSWORD);
  if (!email) return res.status(BAD_REQUEST).json(EMAIL_REQUEST);
  if (!password) return res.status(BAD_REQUEST).json(PASSWORD_REQUEST);
  next();
};

const categoryValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST).json(NAME_REQUIRED);
  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  loginValidation,
  categoryValidation,
};
