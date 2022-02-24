const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');
const { createPost, getAllPosts } = require('../controllers/blogPostController');
const { blogPostValidation, categoryValidation } = require('../middlewares/validations');

router.post('/',
  authentication,
  categoryValidation,
  blogPostValidation,
  createPost);

router.get('/', authentication, getAllPosts);

module.exports = router;
