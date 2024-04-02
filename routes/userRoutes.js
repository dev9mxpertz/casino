/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               selectedCountry:
 *                 type: string
 *               ageConfirmation:
 *                 type: boolean
 *               profileImage:   # Add profileImage property
 *                 type: string  # Assuming profile image is sent as base64 encoded string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 */


// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/api/register', userController.register);

module.exports = router;

