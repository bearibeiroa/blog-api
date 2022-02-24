const blogPostService = require('../services/blogPostServices');
const { UNAUTHORIZED_USER, CATEGORIES_NOT_BE_EDITED } = require('../errors/errorMessages');
const { UNAUTHORIZED, BAD_REQUEST } = require('../errors/errorStatus');

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

module.exports = {
  userValidation,
  categoryEditableValidation,
};
