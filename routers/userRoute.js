const express = require('express');

const router = express.Router();

const { create, getUsers } = require('../controllers/userController');
const { authentication } = require('../middlewares/authentication');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../middlewares/validations');

router.get('/',
  authentication,
  getUsers);

router
  .post('/',
    displayNameValidation,
    emailValidation,
    passwordValidation,
    create);

module.exports = router;
