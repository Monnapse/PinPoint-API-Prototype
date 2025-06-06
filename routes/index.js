const router = require('express').Router();

router.use('/', (req, res) => { res.send('Welcome to the API!'); });

module.exports = router;