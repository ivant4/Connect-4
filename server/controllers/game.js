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

const getGameProp = async (gameProp, req, res, next) => {
    try {
        const { gameId } = req.body;
        const retrievedGameInfo = (await gameModel.find({gameId}))[0];
        if (retrievedGameInfo) {
            const gamePropFound = retrievedGameInfo[gameProp];
            res.status(200).json({gameProp, value: gamePropFound});
        } else {
            throw new TypeError(`Game ID (${gameId}) entered is invalid !`);
        }
    } catch (err) { 
        next(err); 
    }
};

const getBoardState = async (req, res, next) => {
    await getGameProp("boardState", req, res, next);
};

const setBoardState = async (req, res, next) => {
    try {
        const {boardState: newBoardState, gameId} = req.body;
        if (!isValidBoardState(newBoardState)) {
            throw new TypeError(`New board state (${newBoardState}) entered is invalid !`);
        }
        const oldBoardState = await gameModel.findOneAndUpdate({gameId}, {boardState: newBoardState});
        if (oldBoardState) {
            console.log(oldBoardState);
            res.sendStatus(200);
        } else {
            throw new TypeError(`Game ID (${gameId}) entered is invalid !`);
        }
    } catch (err) {
        next(err); 
    }
};

const getGameStatus = async (req, res, next) => {
    await getGameProp("gameStatus", req, res, next);
};

const joinGame = async (gameId) => {
    const retrievedGameInfo = (await gameModel.find({gameId}))[0];
    if (!retrievedGameInfo) {
        throw new TypeError(`Game ID (${gameId}) entered is invalid !`);
    }
    const currentGameStatus = retrievedGameInfo["gameStatus"];
    if (currentGameStatus === "playing") {
        throw new Error("Two players have already joined this game!")
    }
    await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "playing"});
};

const quitGame = async (gameId) => {
    const oldGameInfo = await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "waiting"});
    if (!oldGameInfo) {
        throw new TypeError(`Game ID (${gameId}) entered is invalid !`);
    } else if (oldGameInfo["gameStatus"] === "waiting") { // last player has left 
        await gameModel.deleteOne({gameId}); // delete game with no player
    }
};

const updateGameStatus = async (req, res, next) => {
    try {
        const {"player_status": playerStatus} = req.query;
        const { gameId } = req.body;
        // need to check if game id is valid
        if (playerStatus === "join") {
            await joinGame(gameId);
        } else if (playerStatus === "quit") {
            await quitGame(gameId);
        } else {
            throw new TypeError(`The player status (${playerStatus}) entered is invalid !`);
        }
        res.sendStatus(200);
    } catch (err) { next(err); }
};


module.exports = {
    createNewGame,
    getBoardState,
    getGameStatus,
    setBoardState,
    updateGameStatus,
};