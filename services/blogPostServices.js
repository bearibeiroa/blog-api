const { Op } = require('sequelize');
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

// Referências
// 1: https://stackoverflow.com/questions/20695062/sequelize-or-condition-object
// 2: https://stackoverflow.com/questions/53971268/node-sequelize-find-where-like-wildcard

const searchPost = async (seacrhTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.substring]: seacrhTerm } },
      { content: { [Op.substring]: seacrhTerm } }],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

module.exports = {
  create,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
