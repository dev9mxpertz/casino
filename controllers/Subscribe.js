// controllers/subscribeController.js
const Subscriber = require('../models/subscribemodel');

// Controller function for subscribing
exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if email is provided
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: 'Email is already subscribed' });
        }

        // Create a new subscriber instance
        const newSubscriber = new Subscriber({ email });

        // Save the new subscriber to the database
        const savedSubscriber = await newSubscriber.save();

        // Return success response
        res.status(201).json({ message: 'Success', subscriber: savedSubscriber });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = exports;
