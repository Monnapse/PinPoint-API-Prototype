const { validateEvent } = require('../middleware/validation/events');
const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/event');

// Default Event Routes
router.get('/', eventsController.getAll);
router.get('/:id', eventsController.getById);
router.post('/', validateEvent(), eventsController.create);
router.put('/:id', validateEvent(), eventsController.update);
router.delete('/:id', eventsController.remove);

module.exports = router;