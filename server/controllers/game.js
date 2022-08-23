const gameModel = require("../models/game");

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
            res.status(200).json({gameProp: gamePropFound});
        }
        throw new TypeError(`Game ID (${gameId}) entered is invalid !`);
    } catch (err) { 
        next(err); 
    }
};

const getBoardState = async (req, res, next) => {
    await getGameProp("boardState", req, res, next);
};

const setBoardState = async (req, res) => {
    const {boardState: newBoardState, gameId} = req.body;
    await gameModel.findOneAndUpdate({gameId}, {boardState: newBoardState});
    res.sendStatus(200);
};

const getGameStatus = async (req, res, next) => {
    await getGameProp("gameStatus", req, res, next);
};

const setGameStatus = async (req, res) => {
    try {
        const {"player_status": playerStatus} = req.query;
        const { gameId } = req.body;
        if (playerStatus === "join") {
            await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "playing"});
        } else if (playerStatus === "quit") {
            await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: "waiting"});
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
    setGameStatus,
};