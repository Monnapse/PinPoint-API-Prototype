const { body } = require('express-validator');

function validateEvent() {
  /*
    name: eventData.name,
    description: eventData.description,
    start_date_time: eventData.start_date_time,
    end_date_time: eventData.end_date_time,
    location: eventData.location,
    organizer_id: eventData.organizer_id,
    tags: eventData.tags, = "music, art, culture"
  */

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
    body('end_date_time')
        .isString()
        .withMessage('End date and time must be a valid string'),
    body('location')
      .isString()
      .withMessage('Event location must be a valid string'),
    body('organizer_id')
      .isString()
      .withMessage('Organizer ID must be a valid string'),
    body('tags')
      .optional()
      .isString()
      .withMessage('Tags must be a valid string, e.g., "music, art, culture"')
      .custom(value => {
        // Check if tags are comma-separated
        const tagsArray = value.split(',').map(tag => tag.trim());
        if (tagsArray.length === 0 || tagsArray.some(tag => tag.length < 1)) {
          throw new Error('Tags must be a non-empty comma-separated string');
        }
        return true;
      }),
  ];
}

module.exports = {
  validateEvent,
};