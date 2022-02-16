const checkEmail = (email) => {
  if (email === '') {
    return { status: 400, message: '"email" is not allowed to be empty' };
  }
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  return false;
};

const checkPassword = (password) => {
  if (password === '') {
    return { status: 400, message: '"password" is not allowed to be empty' };
  }
  if (!password) {
    return { status: 400, message: '"password" is required' };
  }
  return false;
};

const accessValidation = (email, password) =>
  checkEmail(email) || checkPassword(password) || false;

module.exports = {
  accessValidation,
};
