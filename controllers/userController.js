const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { CONFLICT, NOT_FOUND, NO_BODY } = require('../errors/errorStatus');
const {
  USER_ALLREADY_EXIST,
  USER_DOES_NOT_EXISTS,
  NO_BODY_RESPONSE,
} = require('../errors/errorMessages');
const { createUser, getAllUsers, getByPk, deleteUser } = require('../services/userServices');

const SECRET = process.env.JWT_SECRET;

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });
  
  if (userEmail) return res.status(CONFLICT).json(USER_ALLREADY_EXIST);
  const user = await createUser(displayName, email, password, image);
  const { id } = user.dataValues;
  const token = jwt.sign({ id, displayName, email }, SECRET);
  console.log(token);

  return res.status(201).json({ token });
});

const getUsers = rescue(async (req, res) => {
  const users = await getAllUsers();
  console.log(req.bia);
  return res.status(200).json(users);
});

const getUsersById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await getByPk(id);

  if (!user) return res.status(NOT_FOUND).json(USER_DOES_NOT_EXISTS);

  return res.status(200).json(user);
});

const deleteUserById = rescue(async (req, res) => {
  const { id } = req.bia;
  await deleteUser(id);
  return res.status(NO_BODY).send(NO_BODY_RESPONSE);
});

module.exports = {
  create,
  getUsers,
  getUsersById,
  deleteUserById,
};
