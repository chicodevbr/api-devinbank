const swaggerAutogen = require('swagger-autogen')();
const outputFile = './src/swagger_output.json';
const doc = require('../src/utils/doc');

const endpointFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  require('./app.js');
});
