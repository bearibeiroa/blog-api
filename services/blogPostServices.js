const { BlogPost } = require('../models');
// const { CATEGORY_ID_NOT_FOUND } = require('../errors/errorMessages');

require('dotenv').config();

const create = async (title, content, id) => {
  // const searchCategory = await Category.findAll({ where: { id: categoryIds } });
  //   if (!searchCategory || searchCategory.length === 0) {
  //   return { message: CATEGORY_ID_NOT_FOUND };
  // }
  const createPost = await BlogPost.create({ title, content, userId: id });
  return createPost;
};

module.exports = { create };
