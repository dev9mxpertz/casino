const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/Subscribe');

/**
 * @swagger
 * tags:
 *   name: Subscription
 *   description: User subscription
 */

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe with email
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Subscription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request, email is required or already subscribed
 *       '500':
 *         description: Internal server error
 */

// Subscribe route
router.post('/', subscribe);

module.exports = router;
