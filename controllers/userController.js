const rescue = require('express-rescue');
const { User } = require('../models');
const { CONFLICT } = require('../errors/errorStatus');
const { USER_ALLREADY_EXIST } = require('../errors/errorMessages');
const { createUser, getAllUsers } = require('../services/userServices');

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

module.exports = {
  create,
  getUsers,
};
