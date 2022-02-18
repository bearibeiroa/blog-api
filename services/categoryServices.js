const { Categories } = require('../models');

const create = async (name) => {
  const categories = await Categories.create({ name });

  return categories;
};

module.exports = { create };
