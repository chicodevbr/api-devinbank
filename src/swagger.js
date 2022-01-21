const swaggerAutogen = require('swagger-autogen')();
const outputFile = './src/swagger_output.json';

const endpointFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointFiles).then(() => {
  require('./app.js');
});
