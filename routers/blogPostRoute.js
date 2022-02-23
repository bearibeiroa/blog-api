const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');
const { createPost } = require('../controllers/blogPostController');
const { blogPostValidation } = require('../middlewares/validations');

router.post('/',
  authentication,
  createPost,
  blogPostValidation);

module.exports = router;
