const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');

const { categoriesCreate } = require('../controllers/categoryController');
const { categoryValidation } = require('../middlewares/validations');

router.post('/', authentication, categoryValidation, categoriesCreate);

module.exports = router;
