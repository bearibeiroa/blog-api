const express = require('express');

const router = express.Router();

const { create, getUsers, getUsersById, deleteUserById } = require('../controllers/userController');
const { authentication } = require('../middlewares/authentication');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../middlewares/validations');

router.get('/',
  authentication,
  getUsers);

router.get('/:id',
  authentication,
  getUsersById);

router
  .post('/',
    displayNameValidation,
    emailValidation,
    passwordValidation,
    create);

router
  .delete('/me',
    authentication,
    deleteUserById);

module.exports = router;
