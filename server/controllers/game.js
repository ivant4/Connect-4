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

const setGameStatus = async (gameId, gameStatus) => {
    await gameModel.findOneAndUpdate({gameId: gameId}, {gameStatus: gameStatus});
};

const switchActivePlayer = async (gameId) => {
    const activePlayerNum = await retrieveGameProp(gameId, "activePlayerNumber");
    const nextActivePlayerNum = activePlayerNum == 1 ? 2 : 1;
    await gameModel.findOneAndUpdate(
        {gameId: gameId}, 
        {activePlayerNumber: nextActivePlayerNum}
    );
};


module.exports = {
    createNewGame,
    retrieveBoardState,
    retrieveGameStatus,
    setBoardState,
    setGameStatus,
    switchActivePlayer
};