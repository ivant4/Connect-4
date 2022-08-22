const express = require('express');
const connectDB = require("./db/connect");
const game = require("./Controller/game");
const mongoose = require('mongoose');
const process = require("process");
require("dotenv").config();

const app = express();


const start = async (url) => {
    try {
        const db = await connectDB(url);
        console.log("Successfully connected to the db");
        await game.createNewGame();
        await db.disconnect();
        console.log("Successfully disconnected from the db")
    } catch (error) {
        console.log(error);
    }
};

start(process.env.MONGO_URI);

/*
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

app.listen(
    5000, 
    () => {console.log("Server listening on port 5000...")}
);

*/