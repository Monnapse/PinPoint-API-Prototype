const { body } = require('express-validator');

function validateComment() {
  return [
    body('comment')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Comment must be at least 3 characters long'),
  ];
}

module.exports = {
  validateComment,
};