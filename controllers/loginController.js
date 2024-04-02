require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is defined in this file

// Login function to handle user login
async function login(req, res) {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: user.userId, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expires in 1 hour
    });

    // Return token and user details
    res.status(200).json({ message: 'Login successful', token, user: { id: user.userId, username: user.username } });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: error.message });
  }
}

// const mongoose = require("mongoose");

// // Initialize MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('MongoDB Connection Error: ', err));

// getUserDetails function
async function getUserDetails(req, res) {
  let username = req.params.username;
  // console.log(email)
  try {
    // Find user in the database
    const user = await User.findOne({username:username });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { login, getUserDetails };
