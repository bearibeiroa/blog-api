const express = require('express');

const router = express.Router();

const { userLogin } = require('../controllers/loginController');
const { loginValidation } = require('../middlewares/validations');

router.post('/', loginValidation, userLogin);

module.exports = router;
