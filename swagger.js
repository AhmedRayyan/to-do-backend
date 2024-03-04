const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Todos API Documentation',
    version: '1.0.0',
  },
  basePath: '/api-doc', // Base path of the API
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/api/*/*.js'], // Path to your API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;