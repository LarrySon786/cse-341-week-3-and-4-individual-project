const express = require("express");
const dotenv = require("dotenv").config();
const mongodb = require('./models/database');
const app = express();
const port = 3000;
const routes = require('./routes/index');
const bodyParser = require('body-parser');


// BODY PARSER for rest client requests
app.use(bodyParser.json());

// ROUTES
app.use('/', routes)

// SWAGGER HEADERS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Orgin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Orgin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

// ERROR HANDLING
process.on('uncaughtException', error => {
 logError(error)

 if (!isOperationalError(error)) {
 process.exit(1)
 }
})

// SET-UP PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Database is listening.")
    }
})


