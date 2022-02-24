// const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { create, getPosts } = require('../services/blogPostServices');

require('dotenv').config();

// const secret = process.env.JWT_SECRET;

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  // const { authorization } = req.headers;
  // const { data: { id } } = jwt.verify(authorization, secret);
  const { id } = req.bia;

  const result = await create(title, content, id);

  if (result.message) return res.status(400).json(result.message);

  // const newPost = await create({ title, content, userId: id });
  return res.status(201).json(result);
});

const getAllPosts = rescue(async (_req, res) => {
  const blogPosts = await getPosts();
  return res.status(200).json(blogPosts);
});

module.exports = { createPost, getAllPosts };
