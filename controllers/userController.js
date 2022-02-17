const rescue = require('express-rescue');
const { User } = require('../models');
const { CONFLICT } = require('../errors/errorStatus');
const { USER_ALLREADY_EXIST } = require('../errors/errorMessages');
const { createUser } = require('../services/userServices');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) return res.status(CONFLICT).json(USER_ALLREADY_EXIST);
  const token = await createUser(displayName, email, password, image);

  return res.status(201).json({ token });
});

module.exports = { create };
