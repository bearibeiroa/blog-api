const rescue = require('express-rescue');
const { create, getAllCategories } = require('../services/categoryServices');

const categoriesCreate = rescue(async (req, res) => {
  const { name } = req.body;
  const categorie = await create(name);

  return res.status(201).json(categorie);
});

const getCategories = rescue(async (req, res) => {
  const categories = await getAllCategories();
  return res.status(200).json(categories);
});

module.exports = {
  categoriesCreate,
  getCategories,
};
