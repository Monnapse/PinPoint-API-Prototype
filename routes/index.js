const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/events', require('./events'));
router.use('/rsvp', require('./rsvp'));
router.use('/comments', require('./comments'));

module.exports = router;