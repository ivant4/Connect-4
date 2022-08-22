require("dotenv").config();

const express = require('express');
const app = express();

const process = require("process");

const connectDB = require("./db/connect");
const gameStatusRouter = require('./routes/gameStatus');
const boardStateRouter = require('./routes/boardState');

app.use('/api/game-status', gameStatusRouter);
app.use('/api/board-state', boardStateRouter);

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

start(process.env.MONGO_URI);