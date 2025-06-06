const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'PinPoint API Prototype',
        description: 'PinPoint API Prototype Documentation',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);