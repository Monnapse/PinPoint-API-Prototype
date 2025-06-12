const express = require('express');
const router = express.Router();

const rsvpController = require('../controllers/rsvp');

router.post('/:id', rsvpController.joinEvent); // Join event
router.delete('/:id', rsvpController.leaveEvent); // Leave event
router.get('/attendees/:id', rsvpController.getEventTotalRSVPStatus); // Get RSVP status for an event
router.get('/:id', rsvpController.getRSVPStatus); // Get user RSVP status

module.exports = router;