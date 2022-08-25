const {gameModel, isValidBoardState} = require("../models/game");

const initialBoardState = [];
for (let i = 0; i < 6; i++) {
    initialBoardState[i] = [];
    for (let j = 0; j < 7; j++) {
        initialBoardState[i][j] = 0;
    }
}


const createGameId = async () => {
    const MAX_NUM_OF_GAME_ID = 10000;
    while (true) {
        let newGameId = Math.floor(MAX_NUM_OF_GAME_ID * Math.random());
        let isNewGameIdUnique = (await gameModel.find({
            gameId: newGameId
        })).length === 0;
        if (isNewGameIdUnique) return newGameId;
    }
};

const createNewGame = async (req, res) => {
    const newBoardState = initialBoardState;
    const newGameId = await createGameId();
    const newGame = new gameModel({
        gameId: newGameId,
        boardState: newBoardState,
        gameStatus: "waiting"
    });
    await newGame.save();
    res.status(200).json({gameId: newGameId});
};

const throwRequestError = (message, next) => {
    // there is an error in the request
    const requestError = new TypeError(message);
    next(requestError);
    throw requestError;
};

const getGameProp = async (gameProp, req, res, next) => {
    try {
        const {"game_id": gameId} = req.query;
        const retrievedGameInfo = (await gameModel.find({gameId}))[0];
        if (retrievedGameInfo) {
            const gamePropFound = retrievedGameInfo[gameProp];
            res.status(200).json({gameProp, value: gamePropFound});
        } else {
            throwRequestError(`Game ID (${gameId}) entered is invalid !`, next)
        }
    } catch (err) { 
        console.log(err); 
    }
};

const getBoardState = async (req, res, next) => {
    await getGameProp("boardState", req, res, next);
};

const setBoardState = async (req, res, next) => {
    try {
        const {"game_id": gameId} = req.query;
        const {boardState: newBoardState} = req.body;
        if (!isValidBoardState(newBoardState)) {
            throwRequestError(`New board state (${newBoardState}) entered is invalid !`, next);
        }
        const oldBoardState = await gameModel.findOneAndUpdate({gameId}, {boardState: newBoardState});
        if (oldBoardState) {
            res.sendStatus(200);
        } else {
            throwRequestError(`Game ID (${gameId}) entered is invalid !`, next);
        }
    } catch (err) {
        console.log(err); 
    }
};

const getGameStatus = async (req, res, next) => {
    await getGameProp("gameStatus", req, res, next);
};

const joinGame = async (gameId, next) => {
    const retrievedGameInfo = (await gameModel.find({gameId}))[0];
    if (!retrievedGameInfo) {
        throwRequestError(`Game ID (${gameId}) entered is invalid !`, next);
    }
    const currentGameStatus = retrievedGameInfo["gameStatus"];
    if (currentGameStatus === "playing") {
        throwRequestError(`You cannot join this game! Two players have joined already.`, next);
    }
    await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "playing"});
};

const quitGame = async (gameId, next) => {
    const oldGameInfo = await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "waiting"});
    if (!oldGameInfo) {
        throwRequestError(`Game ID (${gameId}) entered is invalid !`, next);
    } else if (oldGameInfo["gameStatus"] === "waiting") { // last player has left 
        await gameModel.deleteOne({gameId}); // delete game with no player
    }
};

const updateGameStatus = async (req, res, next) => {
    try {
        const {"player_status": playerStatus, "game_id": gameId} = req.query;
        // need to check if game id is valid
        if (playerStatus === "join") {
            await joinGame(gameId, next);
        } else if (playerStatus === "quit") {
            await quitGame(gameId, next);
        } else {
            throwRequestError(`The player status (${playerStatus}) entered is invalid !`, next)
        }
        res.sendStatus(200);
    } catch (err) { 
        console.log(err); 
    }
};


module.exports = {
    createNewGame,
    getBoardState,
    getGameStatus,
    setBoardState,
    updateGameStatus,
};