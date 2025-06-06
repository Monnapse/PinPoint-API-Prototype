const { validateUser } = require('../middleware/validation/users');
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', validateUser(), usersController.create);
router.put('/:id', validateUser(), usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;