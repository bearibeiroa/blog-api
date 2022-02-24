const rescue = require('express-rescue');
const {
  create,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../services/blogPostServices');
const { NOT_FOUND, NO_BODY } = require('../errors/errorStatus');
const { POST_DOES_NOT_EXISTS, NO_BODY_RESPONSE } = require('../errors/errorMessages');

require('dotenv').config();

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.bia;

  const result = await create(title, content, id);

  if (result.message) return res.status(400).json(result.message);

  return res.status(201).json(result);
});

const getAllPosts = rescue(async (_req, res) => {
  const blogPosts = await getPosts();
  return res.status(200).json(blogPosts);
});

const getPostByPk = rescue(async (req, res) => {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) return res.status(NOT_FOUND).json(POST_DOES_NOT_EXISTS);
    return res.status(200).json(post);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { userId, categories } = req.bia;
  console.log(req.bia);
  const { title, content } = req.body;
  await updatePost({ id, title, content });
  return res.status(200).json({ title, content, userId, categories });
});

const deletePostById = rescue(async (req, res) => {
  const { id } = req.params;
  await deletePost(id);
  return res.status(NO_BODY).send(NO_BODY_RESPONSE);
});

module.exports = {
  createPost,
  getAllPosts,
  getPostByPk,
  update,
  deletePostById,
};
