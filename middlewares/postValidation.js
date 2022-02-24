const blogPostService = require('../services/blogPostServices');
const {
  UNAUTHORIZED_USER,
  CATEGORIES_NOT_BE_EDITED,
  POST_DOES_NOT_EXISTS,
} = require('../errors/errorMessages');
const { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND } = require('../errors/errorStatus');

const userValidation = async (req, res, next) => {
    const { id: user } = req.bia;
    const { id } = req.params;
    const { userId, categories } = await blogPostService.getPostById(id);
    if (userId !== user) {
      return res.status(UNAUTHORIZED).json(UNAUTHORIZED_USER);
    }

    req.bia = {
      userId,
      categories,
    };

    next();
};

const categoryEditableValidation = (req, res, next) => {
    const { body } = req;
    const bodyKeys = Object.keys(body);
    if (bodyKeys.includes('categoryIds')) {
      return res.status(BAD_REQUEST).json(CATEGORIES_NOT_BE_EDITED);
    }
    next();
};

const postExistsValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postId = await blogPostService.getPostById(id);
    if (!postId) return res.status(NOT_FOUND).json(POST_DOES_NOT_EXISTS);

    next();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  userValidation,
  categoryEditableValidation,
  postExistsValidation,
};
