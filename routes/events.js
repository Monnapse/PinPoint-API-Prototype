const { validateEvent } = require('../middleware/validation/events');
const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/event');

const { isAuthenticated } = require('../middleware/authenticate');

// Default Event Routes
router.get('/', eventsController.getAll);
router.get('/:id', eventsController.getById);
router.post('/', isAuthenticated, validateEvent(), eventsController.create);
router.put('/:id', isAuthenticated, validateEvent(), eventsController.update);
router.delete('/:id', isAuthenticated, eventsController.remove);

module.exports = router;