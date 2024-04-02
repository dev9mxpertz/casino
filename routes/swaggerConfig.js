const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your endpoints',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update the URL as per your server configuration
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes directory
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
