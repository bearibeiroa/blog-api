const { Category } = require('../models');

const create = async (name) => {
  const categories = await Category.create({ name });

  return categories;
};

module.exports = { create };
