const {
  DISPLAY_NAME,
  EMAIL,
  EMAIL_REQUEST,
  PASSWORD,
  PASSWORD_REQUEST,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  TITLE_REQUIRED,
  CONTENT_REQUIRED,
  CATEGORY_REQUIRED,
  NAME_REQUIRED,
} = require('../errors/errorMessages');

const { BAD_REQUEST } = require('../errors/errorStatus');
const { getAllCategories } = require('../services/categoryServices');

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

// Consulta ao repositório do Danilo Santos.

const categoryValidation = async (req, res, next) => {
  const validationFirsItem = (item, array) => array.some((itemArrat) => item === itemArrat.id);

  const { categoryIds } = req.body;

  if (!categoryIds) return res.status(BAD_REQUEST).json(CATEGORY_REQUIRED);

  const categoriesArray = await getAllCategories();

  const checkCategories = categoryIds.every((item) => { 
    if (validationFirsItem(item, categoriesArray)) {
      return true;
    }
    return false;
  });

  if (!checkCategories) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const nameCategoryValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST).json(NAME_REQUIRED);
  next();
};

const blogPostValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || title === '') return res.status(BAD_REQUEST).json(TITLE_REQUIRED);
  if (!content) return res.status(BAD_REQUEST).json(CONTENT_REQUIRED);
  if (categoryIds === 0) return res.status(BAD_REQUEST).json(CATEGORY_REQUIRED);
  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  loginValidation,
  categoryValidation,
  blogPostValidation,
  nameCategoryValidation,
};
