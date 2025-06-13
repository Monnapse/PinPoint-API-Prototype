const express = require('express');
const router = express.Router();

const rsvpController = require('../controllers/rsvp');

const { isAuthenticated } = require('../middleware/authenticate');

router.post('/:id', isAuthenticated, rsvpController.joinEvent); // Join event
router.delete('/:id', isAuthenticated, rsvpController.leaveEvent); // Leave event
router.get('/attendees/:id', rsvpController.getEventTotalRSVPStatus); // Get RSVP status for an event
router.get('/:id', isAuthenticated, rsvpController.getRSVPStatus); // Get user RSVP status

module.exports = router;