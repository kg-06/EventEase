const express = require('express');
const router = express.Router();

const Assignment = require('../models/assignment');
const User = require('../models/user'); 
const Event = require('../models/event'); 
const AppError = require('../utilis/AppError');


router.post('/', async (req, res, next) => {
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            return next(new AppError("Missing userId or eventId!", 400));
        }

        const userExists = await User.exists({ id: userId });
        if (!userExists) {
            return next(new AppError("User ID does not exist!", 400));
        }

        const eventExists = await Event.exists({ id: eventId });
        if (!eventExists) {
            return next(new AppError("Event ID does not exist!", 400));
        }

        const existingAssignment = await Assignment.findOne({ userId, eventId });
        if (existingAssignment) {
            return next(new AppError("Assignment already exists..", 400));
        }

        const newAssignment = new Assignment({ userId, eventId });
        await newAssignment.save();

        res.status(201).json({ message: "Assignment added", assignment: newAssignment });
    } catch (err) {
        next(err);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (err) {
        next(err);
    }
});


router.get('/organizer/:userId', async (req, res, next) => {
    try {
        const assignments = await Assignment.find({ userId: req.params.userId });
        if (assignments.length === 0) {
            return next(new AppError("No events found for this organizer!", 404));
        }
        res.json(assignments);
    } catch (err) {
        next(err);
    }
});


router.get('/event/:eventId', async (req, res, next) => {
    try {
        const assignments = await Assignment.find({ eventId: req.params.eventId });
        if (assignments.length === 0) {
            return next(new AppError("No organizers found for this event!", 404));
        }
        res.json(assignments);
    } catch (err) {
        next(err);
    }
});


router.delete('/organizer/:userId', async (req, res, next) => {
    try {
        const result = await Assignment.deleteMany({ userId: req.params.userId });
        if (result.deletedCount === 0) {
            return next(new AppError("No assignments found for this user!", 404));
        }
        res.json({ message: "All assignments for this user are deleted" });
    } catch (err) {
        next(err);
    }
});


router.delete('/event/:eventId', async (req, res, next) => {
    try {
        const result = await Assignment.deleteMany({ eventId: req.params.eventId });
        if (result.deletedCount === 0) {
            return next(new AppError("No assignments found for this event!", 404));
        }
        res.json({ message: "All assignments for this event are deleted!" });
    } catch (err) {
        next(err);
    }
});


router.delete('/', async (req, res, next) => {
    try {
        const { userId, eventId } = req.body;
        if (!userId || !eventId) {
            return next(new AppError("Missing userId or eventId", 400));
        }

        const result = await Assignment.deleteOne({ userId, eventId });
        if (result.deletedCount === 0) {
            return next(new AppError("Assignment not found", 404));
        }

        res.json({ message: "Assignment deleted" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
