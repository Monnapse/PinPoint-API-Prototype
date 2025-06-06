const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'PinPoint API Prototype',
        description: 'PinPoint API Prototype Documentation',
    },
    host: 'pinpoint-api-prototype.onrender.com',
    schemes: ['https', 'http'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);