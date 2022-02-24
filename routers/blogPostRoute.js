const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');
const {
  createPost, getAllPosts, getPostByPk, update } = require('../controllers/blogPostController');
const { blogPostValidation, categoryValidation } = require('../middlewares/validations');
const { categoryEditableValidation, userValidation } = require('../middlewares/postValidation');

router.post('/',
  authentication,
  categoryValidation,
  blogPostValidation,
  createPost);

router.get('/:id',
  authentication,
  getPostByPk);

router.get('/', authentication, getAllPosts);

router.put('/:id',
  authentication,
  blogPostValidation,
  categoryEditableValidation,
  userValidation,
  update);

module.exports = router;
