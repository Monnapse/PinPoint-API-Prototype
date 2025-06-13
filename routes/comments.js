const { validateComment } = require('../middleware/validation/comments');
const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:eventId', commentsController.getCommentsByEventId); // Get comments for an event
router.post('/:eventId', isAuthenticated, validateComment(), commentsController.postComment); // Post comment
router.put('/:commentId', isAuthenticated, validateComment(), commentsController.editComment); // Update comment
router.delete('/:commentId', isAuthenticated, commentsController.deleteComment); // Delete Comment

module.exports = router;