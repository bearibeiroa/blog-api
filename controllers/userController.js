const rescue = require('express-rescue');
const { User } = require('../models');
const { CONFLICT, NOT_FOUND } = require('../errors/errorStatus');
const { USER_ALLREADY_EXIST, USER_DOES_NOT_EXISTS } = require('../errors/errorMessages');
const { createUser, getAllUsers, getByPk } = require('../services/userServices');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) return res.status(CONFLICT).json(USER_ALLREADY_EXIST);
  const token = await createUser(displayName, email, password, image);

  return res.status(201).json({ token });
});

const getUsers = rescue(async (_req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
});

const getUsersById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await getByPk(id);

  if (!user) return res.status(NOT_FOUND).json(USER_DOES_NOT_EXISTS);

  return res.status(200).json(user);
});

module.exports = {
  create,
  getUsers,
  getUsersById,
};
