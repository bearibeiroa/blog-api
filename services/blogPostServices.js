const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

require('dotenv').config();

const create = async (title, content, id) => {
  const createPost = await BlogPost.create({ title, content, userId: id });
  return createPost;
};

const getPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, {
      model: Category, as: 'categories', through: { attributes: [] },
    }],
  });
  return blogPosts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return post;
};

const updatePost = async ({ id, title, content }) => {
  const postUpdate = await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  return postUpdate;
};

const deletePost = async (id) => {
  const postDeleted = await BlogPost.destroy({ where: { id } });
  return postDeleted;
};

module.exports = {
  create,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
