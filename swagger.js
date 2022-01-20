const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';

const endpointFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointFiles).then(() => {
  require('./app.js');
});
