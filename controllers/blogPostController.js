const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { create } = require('../services/blogPostServices');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const { data: { id } } = jwt.verify(token, secret);

  const result = await create(title, content, id);

  if (result.message) return res.status(400).json(result.message);

  const newPost = await create({ title, content, userId: id });
  return res.status(201).json(newPost);
});
module.exports = { createPost };
