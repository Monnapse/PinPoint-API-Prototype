const { validateComment } = require('../middleware/validation/comments');
const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.get('/:eventId', commentsController.getCommentsByEventId); // Get comments for an event
router.post('/:eventId', validateComment(), commentsController.postComment); // Post comment
router.put('/:commentId', validateComment(), commentsController.editComment); // Update comment
router.delete('/:commentId', commentsController.deleteComment); // Delete Comment

module.exports = router;