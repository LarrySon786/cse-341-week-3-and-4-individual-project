const express = require("express");
const dotenv = require("dotenv").config();
const mongodb = require('./models/database');
const app = express();
const port = 3000;

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


