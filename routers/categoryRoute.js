const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');

const { categoriesCreate, getCategories } = require('../controllers/categoryController');
const { nameCategoryValidation } = require('../middlewares/validations');

router.post('/', authentication, nameCategoryValidation, categoriesCreate);
router.get('/', authentication, getCategories);

module.exports = router;
