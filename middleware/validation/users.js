const { body } = require('express-validator');

function validateUser() {
  return [
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('email')
      .isEmail()
      .withMessage('Invalid email address'),
  ];
}

module.exports = {
  validateUser,
};