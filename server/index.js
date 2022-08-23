require("dotenv").config();

const express = require('express');
const app = express();

const process = require("process");

const connectDB = require("./db/connect");
const gameStatusRouter = require('./routes/gameStatus');
const boardStateRouter = require('./routes/boardState');

const errorHandlerMiddleware = require("./middleware/errorHandler");
const routeNotFoundMiddleware = require("./middleware/routeNotFound");

// parse request body to json 
app.use(express.json());

app.use('/api/game-status', gameStatusRouter);
app.use('/api/board-state', boardStateRouter);


app.use(routeNotFoundMiddleware);
// put this last so it catch the errors of other middleware functions
app.use(errorHandlerMiddleware); 

const start = async (dbURL, port) => {
    try {
        const db = await connectDB(dbURL);
        console.log("Successfully connected to the db");
        //await db.disconnect();
        //console.log("Successfully disconnected from the db");
        app.listen(port, () => {console.log(`Listening on port ${port}...`)});
    } catch (error) {
        console.log(error);
    }
};
const port = process.env.PORT || 5000;
start(process.env.MONGO_URI, port);