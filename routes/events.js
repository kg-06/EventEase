const express = require('express');
const router = express.Router();
const AppError = require('../utilis/AppError');
const Event = require('../models/event'); 


router.get('/', async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json({ success: true, data: events });
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const event = await Event.findOne({ id: req.params.id });
        if (!event) return next(new AppError("Event not found", 404));
        res.json({ success: true, data: event });
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { id, name, date } = req.body;
        if (!id || !name || !date) {
            return next(new AppError("Missing required fields", 400));
        }

        const existingEvent = await Event.findOne({ id });
        if (existingEvent) {
            return next(new AppError("Event already exists at this ID!", 400));
        }

        const newEvent = new Event({ id, name, date });
        await newEvent.save();
        res.status(201).json({ message: "Event added", event: newEvent });
    } catch (err) {
        next(err);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const { name, date } = req.body;
        const event = await Event.findOne({ id: req.params.id });

        if (!event) return next(new AppError("Event not found", 404));

        if (name) event.name = name;
        if (date) event.date = date;
        await event.save();

        res.json({ message: "Event updated!", event });
    } catch (err) {
        next(err);
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ id: req.params.id });
        if (!deletedEvent) return next(new AppError("Event not found", 404));

        const events = await Event.find();
        res.json({ message: "Event deleted", data: events });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
