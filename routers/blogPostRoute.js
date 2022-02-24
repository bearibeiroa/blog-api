const express = require('express');

const router = express.Router();

const { authentication } = require('../middlewares/authentication');
const {
  createPost,
  getAllPosts,
  getPostByPk,
  update,
  deletePostById,
  getSearch } = require('../controllers/blogPostController');
const { blogPostValidation, categoryValidation } = require('../middlewares/validations');
const {
  categoryEditableValidation,
  userValidation,
  postExistsValidation,
} = require('../middlewares/postValidation');

router.get('/search',
  authentication,
  getSearch);

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

router.delete('/:id',
  postExistsValidation,
  authentication,
  userValidation,
  deletePostById);

module.exports = router;
