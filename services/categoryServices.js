const { Category } = require('../models');

const create = async (name) => {
  const categories = await Category.create({ name });

  return categories;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAllCategories,
};
