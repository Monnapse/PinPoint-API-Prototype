const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/events', require('./events'));
router.use('/rsvp', require('./rsvp'));
router.use('/comments', require('./comments'));

router.get('/login', passport.authenticate('github', {}));
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');
    })
});

module.exports = router;