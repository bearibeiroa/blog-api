const DISPLAY_NAME = { message: '"displayName" length must be at least 8 characters long' };
const EMAIL = { message: '"email" must be a valid email' };
const EMAIL_REQUEST = { message: '"email" is required' };
const PASSWORD = { message: '"password" length must be 6 characters long' };
const PASSWORD_REQUEST = { message: '"password" is required' };
const USER_ALLREADY_EXIST = { message: 'User already registered' };
const INVALID_FIELDS = { message: 'Invalid fields' };
const EMPTY_EMAIL = { message: '"email" is not allowed to be empty' };
const EMPTY_PASSWORD = { message: '"password" is not allowed to be empty' };

module.exports = {
  DISPLAY_NAME,
  EMAIL,
  EMAIL_REQUEST,
  PASSWORD,
  PASSWORD_REQUEST,
  USER_ALLREADY_EXIST,
  INVALID_FIELDS,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
};
