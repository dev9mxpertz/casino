const express = require('express');
const router = express.Router();
const { login, getUserDetails } = require('../controllers/loginController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Authentication]
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
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

/**
 *  @swagger
 * /auth/user/{username}:
 *   get:
 *     summary: Get user details
 *     tags: 
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to retrieve details for
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *       '401':
 *         description: Unauthorized - Token not provided or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error

 */

// Login route
router.post('/login', login);

// Get user details route
router.get('/user/:username', getUserDetails);

module.exports = router;
