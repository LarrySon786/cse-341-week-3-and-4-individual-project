const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Enrollment and Applicants Api',
        description: 'An Api to display enrollments for project'
    },
    host: 'localhost:3000',
    // NEED to remove the 'http' when uploading to render
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);




