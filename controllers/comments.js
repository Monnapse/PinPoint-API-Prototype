const { validationResult } = require('express-validator');
const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const tempUserId = '6843166722467116e87fba42'; // TODO: Replace with actual user ID from authentication middleware

const getAllComments = async () => {
    try {
        const result = await mongodb.getDatabase().db().collection('comments').find();
        return result.toArray().then((comments) => {
            return comments;
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getCommentsByEventId = async (req, res) => {
    //#swagger.tags = ['Comments']
    //#swagger.description = 'Get comments for an event'

    try {
        const eventId = new ObjectId(req.params.eventId);
        const comments = await getAllComments();
        if (!comments) {
            return res.status(500).json({ message: 'No Comments! Internal Server Error' });
        }

        const filteredComments = comments.filter(comment => comment.event_id && comment.event_id instanceof ObjectId && comment.event_id.equals(eventId));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(filteredComments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const postComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    //#swagger.description = 'Post a comment on an event'

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const eventId = new ObjectId(req.params.eventId);
        const userId = new ObjectId(tempUserId);

        const commentData = req.body;
        const comment = {
            event_id: eventId,
            user_id: userId,
            comment: commentData.comment,
        };

        const response = await mongodb.getDatabase().db().collection('comments').insertOne(comment);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while commeting on event.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const editComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    //#swagger.description = 'Edit a comment on an event'

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const commentId = new ObjectId(req.params.commentId);
        const commentData = req.body;

        const response = await mongodb.getDatabase().db().collection('comments').updateOne(
            { _id: commentId },
            { $set: { comment: commentData.comment } }
        );

        if (response.modifiedCount === 0) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteComment = async (req, res) => {
    //#swagger.tags = ['Comments']
    //#swagger.description = 'Delete a comment on an event'

    try {
        const commentId = new ObjectId(req.params.commentId);

        const response = await mongodb.getDatabase().db().collection('comments').deleteOne({ _id: commentId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    postComment,
    getCommentsByEventId,
    editComment,
    deleteComment,
};