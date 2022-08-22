const express = require('express');
const connectDB = require("./db/connect");
const {
    createNewGame,
    retrieveBoardState,
    retrieveGameStatus,
    setBoardState, 
    incrementActivePlayerCount,
    decrementActivePlayerCount
} = require("./Controller/game");
const mongoose = require('mongoose');
const process = require("process");
require("dotenv").config();
const app = express();

const start = async (url) => {
    try {
        const db = await connectDB(url);
        console.log("Successfully connected to the db");
        await db.disconnect();
        console.log("Successfully disconnected from the db");
        app.listen(5000, () => {console.log("Listening on port 5000...")});
    } catch (error) {
        console.log(error);
    }
};


app.get("/api", (req, res) => { // retrieve board state
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

app.post("/api", (req, res) => { // create new game 
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

app.patch("/api", (req, res) => { // update board state or player left
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

start(process.env.MONGO_URI);