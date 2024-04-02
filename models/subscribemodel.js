const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure emails are unique
  }
});

const Subscribe = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscribe;
