const { validationResult } = require('express-validator');
const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Events']
    //#swagger.description = 'Get all events'
    try {
        const result = await mongodb.getDatabase().db().collection('events').find();
        result.toArray().then((events) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(events);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getById = async (req, res) => {
    //#swagger.tags = ['Events']
    //#swagger.description = 'Get event by ID'
    try {
        const eventId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('events').find({_id: eventId});
        result.toArray().then((events) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(events[0]);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const create = async (req, res) => {
    //#swagger.tags = ['Events']
    //#swagger.description = 'Create a new event'
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const eventData = req.body;
        const event = {
            name: eventData.name,
            description: eventData.description,
            start_date_time: eventData.start_date_time,
        };

        const response = await mongodb.getDatabase().db().collection('events').insertOne(event);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the event.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const update = async (req, res) => {
    //#swagger.tags = ['Events']
    //#swagger.description = 'Update an existing event'

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const eventId = new ObjectId(req.params.id);
        const eventData = req.body;
        const event = {
            name: eventData.name,
            description: eventData.description,
            start_date_time: eventData.start_date_time,
        };

        const response = await mongodb.getDatabase().db().collection('events').replaceOne({ _id: eventId }, event);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the event.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove = async (req, res) => {
    //#swagger.tags = ['Events']
    //#swagger.description = 'Delete an event'
    try {
        const eventId = new ObjectId(req.params.id);
       const response = await mongodb.getDatabase().db().collection('events').deleteOne({ _id: eventId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while deleting the event.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};