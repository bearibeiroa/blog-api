const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');
const { createPost, getAllPosts, getPostByPk } = require('../controllers/blogPostController');
const { blogPostValidation, categoryValidation } = require('../middlewares/validations');

router.post('/',
  authentication,
  categoryValidation,
  blogPostValidation,
  createPost);

router.get('/:id',
  authentication,
  getPostByPk);

router.get('/', authentication, getAllPosts);

module.exports = router;
