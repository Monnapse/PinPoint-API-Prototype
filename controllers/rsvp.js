const { validationResult } = require('express-validator');
const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

//const tempUserId = '6843166722467116e87fba42'; // TODO: Replace with actual user ID from authentication middleware

const getAllRsvps = async () => {
    try {
        const result = await mongodb.getDatabase().db().collection('rsvp').find();
        return result.toArray().then((events) => {
            return events;
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

const joinEvent = async (req, res) => {
    //#swagger.tags = ['RSVP']
    //#swagger.description = 'Join an event'

    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const eventId = new ObjectId(req.params.id);
        const userId = req.session.user.id;

        //console.log("Event ID:", eventId.toString());

        const events = await getAllRsvps();
        if (!events) {
            return res.status(500).json({ message: 'No Events! Internal Server Error' });
        }
        //console.log(events);

        for (eventObject of events) {
            if (
                eventObject.event_id && eventObject.event_id.equals(eventId) &&
                eventObject.user_id && eventObject.user_id == userId
            ) {
                return res.status(400).json({ message: 'You have already joined this event.' });
            }
        }

        //console.log("Joining event with ID:", eventId.toString(), "for user ID:", userId.toString());

        const rsvp = {
            event_id: eventId,
            user_id: userId,
        };

        //console.log('Saving RSVP:', rsvp);

        const response = await mongodb.getDatabase().db().collection('rsvp').insertOne(rsvp);
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

const leaveEvent = async (req, res) => {
    //#swagger.tags = ['RSVP']
    //#swagger.description = 'Leave an event'

    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const eventId = new ObjectId(req.params.id);
        const userId = req.session.user.id;

        const response = await mongodb.getDatabase().db().collection('rsvp').deleteOne({
            event_id: eventId,
            user_id: userId,
        });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'RSVP not found.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getEventTotalRSVPStatus = async (req, res) => {
    //#swagger.tags = ['RSVP']
    //#swagger.description = 'Get RSVP status for an event'

    try {
        const eventId = new ObjectId(req.params.id);
        //const userId = new ObjectId(tempUserId);

        const rsvp = await mongodb.getDatabase().db().collection('rsvp').find({
            event_id: eventId,
        }).toArray();

        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found.' });
        }

        //console.log('RSVP Status:', rsvp);

        //for await rsvp.toArray();

        res.status(200).json({total: rsvp.length || 0});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getRSVPStatus = async (req, res) => {
    //#swagger.tags = ['RSVP']
    //#swagger.description = 'Get user RSVP status'

    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const eventId = new ObjectId(req.params.id);
        const userId = req.session.user.id;

        const rsvp = await mongodb.getDatabase().db().collection('rsvp').find({
            event_id: eventId,
            user_id: userId,
        }).toArray();

        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found.' });
        }

        res.status(200).json({ status: rsvp.length > 0 ? 'joined' : 'not joined' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    joinEvent,
    leaveEvent,
    getEventTotalRSVPStatus,
    getRSVPStatus
};