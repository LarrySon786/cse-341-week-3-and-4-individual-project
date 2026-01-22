const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



