const { validationResult } = require('express-validator');
const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Get all users'
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getById = async (req, res) => {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Get user by ID'
    try {
        const userId = req.session.user.id;
        const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const create = async (req, res) => {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Create a new user'
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = req.body;
        const user = {
            username: userData.username,
            email: userData.email,
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const update = async (req, res) => {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Update an existing user'

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.session.user.id;
        const userData = req.body;
        const user = {
            username: userData.username,
            email: userData.email,
        };

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove = async (req, res) => {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Delete a user'
    try {
        const userId = req.session.user.id;
       const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while deleting the user.");
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