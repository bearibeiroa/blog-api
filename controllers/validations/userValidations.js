const checkDisplayName = (path, keyValidator) => {
  if (path === 'displayName' && keyValidator === 'is_null') {
    return { status: 400, message: '"displayName" is required' };
  }
  if (path === 'displayName') {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  return false;
};

const checkEmail = (path, type, keyValidator) => {
  if (path === 'email' && keyValidator === 'is_null') {
    return { status: 400, message: '"email" is required' };
  }
  if (path === 'email' && type === 'Validation error') {
    return { status: 400, message: '"email" must be a valid email' };
  }
  return false;
};

const checkEmailExists = (path, keyValidator) => {
  if (path === 'Users.email' && keyValidator === 'not_unique') {
    return { status: 409, message: 'User already registered' };
  }
};

const checkPassword = (path, keyValidator) => {
  if (path === 'password' && keyValidator === 'is_null') {
    return { status: 400, message: '"password" is required' };
  }
  if (path === 'password') {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return false;
};

const requestsValidation = (error) => {
  const { path, type, keyValidator } = error.error[0];
  return (
    checkDisplayName(path, keyValidator) || checkEmail(path, type, keyValidator) || (
      checkEmailExists(path, keyValidator)) || checkPassword(path, keyValidator) || {}
      );
};

module.exports = {
  requestsValidation,
};
