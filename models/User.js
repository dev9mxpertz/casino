const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
      },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    selectedCountry: {
        type: String,
        required: true
    },
    ageConfirmation: {
        type: Boolean,
        required: true
    },
    image: {
        type: String, // Change the type to String
        required: false // Optional field
    }   
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
