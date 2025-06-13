const { validateUser } = require('../middleware/validation/users');
const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');

const usersController = require('../controllers/user');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', isAuthenticated, validateUser(), usersController.create);
router.put('/:id', isAuthenticated, validateUser(), usersController.update);
router.delete('/:id', isAuthenticated, usersController.remove);

module.exports = router;