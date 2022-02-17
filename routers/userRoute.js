const express = require('express');

const router = express.Router();

const { create } = require('../controllers/userController');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../middlewares/validations');

router
  .post('/',
    displayNameValidation,
    emailValidation,
    passwordValidation,
    create);

module.exports = router;
