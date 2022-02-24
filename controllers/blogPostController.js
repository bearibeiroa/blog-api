// const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { create, getPosts, getPostById } = require('../services/blogPostServices');
const { NOT_FOUND } = require('../errors/errorStatus');
const { POST_DOES_NOT_EXISTS } = require('../errors/errorMessages');

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

module.exports = { createPost, getAllPosts, getPostByPk };
