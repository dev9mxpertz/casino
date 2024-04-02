// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// // Register function to handle user registration
// async function register(req, res) {
//   const { username, password, selectedCountry, ageConfirmation, profileImage } = req.body;

//   // Basic validation
//   if (!username || !password || !selectedCountry || ageConfirmation === undefined || profileImage === undefined) {
//     return res.status(400).json({ message: 'Please provide username, password, selectedCountry, ageConfirmation, and profileImage' });
//   }


//   try {
//     // Check if the username is already taken
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username is already taken' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

//     // Generate a unique 10-digit ID
//     const userId = await generateUniqueUserId();

//     // Create a new user document instance with the provided username
//     const newUser = new User({ userId, username, password: hashedPassword, selectedCountry, ageConfirmation, profileImage });

//     // Save the user document to the database
//     await newUser.save();

//     // Return the saved user object as a response
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     // Send the error message back to the client
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: error.message });
//   }
// }

// // Function to generate a unique 10-digit user ID
// async function generateUniqueUserId() {
//   let userId = '';
//   const characters = '0123456789';

//   // Generate a random 10-digit ID
//   for (let i = 0; i < 10; i++) {
//     userId += characters.charAt(Math.floor(Math.random() * characters.length));
//   }

//   // Check if the generated ID is unique
//   const existingUser = await User.findOne({ userId });
//   if (existingUser) {
//     // If the ID already exists, recursively call the function to generate a new one
//     return generateUniqueUserId();
//   }

//   // If the ID is unique, return it
//   return userId;
// }

// module.exports = { register };





const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register function to handle user registration
async function register(req, res) {
  const { userId, username, password, selectedCountry, ageConfirmation, profileImage } = req.body;

  // Basic validation
  if (!username || !password || !selectedCountry || ageConfirmation === undefined ) {
    return res.status(400).json({ message: 'Please provide userId username, password, selectedCountry and ageConfirmation' });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Generate a unique 10-digit ID
    const userId = await generateUniqueUserId();

    // Create a new user document instance with the provided username
    const newUser = new User({ userId, username, password: hashedPassword, selectedCountry, ageConfirmation, profileImage });

    // If profileImage is provided, update the profile image
    if (profileImage) {
      newUser.profileImage = {
        data: Buffer.from(profileImage, 'base64'), // Assuming profileImage is base64 encoded string
        contentType: 'image/png' // Set the appropriate content type
      };
    }

    // Save the user document to the database
    await newUser.save();

    // Return the saved user object as a response
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    // Send the error message back to the client
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
}
// Function to generate a unique 10-digit user ID
async function generateUniqueUserId() {
  let userId = '';
  const characters = '0123456789';

  // Generate a random 10-digit ID
  for (let i = 0; i < 10; i++) {
    userId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Check if the generated ID is unique
  const existingUser = await User.findOne({ userId });
  if (existingUser) {
    // If the ID already exists, recursively call the function to generate a new one
    return generateUniqueUserId();
  }
  // If the ID is unique, return it
  return userId;
}
module.exports = { register };
