const dotenv = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient()

let database;

MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        database = client;
    })

