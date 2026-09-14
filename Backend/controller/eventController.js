const Event = require('../models/Event');


// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const filters = {};

        // Search by title
        if (req.query.search) {
            filters.title = {
                $regex: req.query.search,
                $options: 'i'
            };
        }

        // Filter by category
        if (req.query.category) {
            filters.category = req.query.category;
        }

        // Filter by ticket price
        if (req.query.ticketPrice) {
            filters.ticketPrice = req.query.ticketPrice;
        }

        const events = await Event.find(filters).sort({ date: 1 });

        res.json(events);

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};


// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }

        res.json(event);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Update event
exports.updateEvent = async (req, res) => {

    const {
        title,
        description,
        date,
        location,
        category,
        totalSeats,
        ticketPrice,
        imageUrl
    } = req.body;

    try {

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                date,
                location,
                category,
                totalSeats,
                ticketPrice,
                imageUrl
            },
            {
                new: true
            }
        );

        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }

        res.json(event);

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });

    }
};


// Create event
exports.createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUrl
        } = req.body;

        const event = await Event.create({

            title,
            description,
            date,
            location,
            category,

            totalSeats,

            availableSeats: totalSeats,

            ticketPrice: ticketPrice || 0,

            imageUrl: imageUrl || '',

            createdBy: req.user.id
        });

        res.status(201).json(event);

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });

    }
};


// Delete event
exports.deleteEvent = async (req, res) => {

    try {

        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        res.json({
            message: 'Event deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });

    }
};