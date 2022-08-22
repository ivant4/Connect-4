const gameModel = require("../Models/game");

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
        const newGameId = Math.floor(MAX_NUM_OF_GAME_ID * Math.random());
        try {
            const isNewGameIdUnique = (await gameModel.find({
                gameId: newGameId
            })).length === 0;
            if (isNewGameIdUnique) return newGameId;
        } catch (error) {
            console.log(error);
        }
     }
};

const createNewGame = async () => {
    const newBoardState = initialBoardState;
    const newGameId = await createGameId();
    const newGame = new gameModel({
        gameId: newGameId,
        boardState: newBoardState,
        numOfActivePlayers: 1,
        gameStatus: "waiting"
    });
    await newGame.save();
};

const retrieveGameProp = async (gameId, gameProp) => {
    const retrievedGameInfo = (await gameModel.find({gameId}))[0];
    return retrievedGameInfo[gameProp];
}


const retrieveBoardState = async (gameId) => {
    return await retrieveGameProp(gameId, "boardState");
};

const setBoardState = async (gameId, newBoardState) => {
    await gameModel.findOneAndUpdate({gameId: gameId}, {boardState: newBoardState}); 
};

const retrieveGameStatus = async (gameId) => {
    return await retrieveGameProp(gameId, "gameStatus");
};


const incrementActivePlayerCount = async (gameId) => {
    const numOfActivePlayers = retrieveGameProp(gameId, "numOfActivePlayers");
    if (numOfActivePlayers == 2) { 
        // TODO: handle when a third player tries to join !!!!
    } else {
        await gameModel.findOneAndUpdate(
            {gameId: gameId}, 
            {numOfActivePlayers: 2, gameStatus: "playing"}
        );
    }
};

const decrementActivePlayerCount = async (gameId) => {
    const numOfActivePlayers = retrieveGameProp(gameId, "numOfActivePlayers");
    if (numOfActivePlayers == 1) {
        await gameModel.deleteOne({gameId: gameId}); 
    } else {
        await gameModel.findOneAndUpdate(
            {gameId: gameId}, 
            {numOfActivePlayers: 1, gameStatus: "waiting"}
        );
    }
};


module.exports = {
    createNewGame,
    retrieveBoardState,
    retrieveGameStatus,
    setBoardState, 
    incrementActivePlayerCount,
    decrementActivePlayerCount
};