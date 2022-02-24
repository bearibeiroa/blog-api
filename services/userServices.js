const { User } = require('../models');
require('dotenv').config();

const createUser = async (displayName, email, password, image) => {
  const NewUser = await User.create({ displayName, email, password, image });

  return NewUser;
};

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getAllUsers = async () => User.findAll();

const getByPk = async (id) => User.findByPk(id);

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getByPk,
  deleteUser,
}; 
