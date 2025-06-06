const { body } = require('express-validator');

function validateEvent() {
  return [
    body('name')
      .isLength({ min: 3 })
      .withMessage('Event name must be at least 3 characters long'),
    body('description')
      .isLength({ min: 10 })
      .withMessage('Event description must be at least 10 characters long'),
    body('start_date_time')
        .isString()
        .withMessage('Start date and time must be a valid string'),
  ];
}

module.exports = {
  validateEvent,
};