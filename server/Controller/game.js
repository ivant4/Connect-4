const game = require("../Models/game");

const initialBoardState = [];
for (let i = 0; i < 6; i++) {
    initialBoardState[i] = [];
    for (let j = 0; j < 7; j++) {
        initialBoardState[i][j] = 0;
    }
}

const createGameId = () => {
    return 1000;
}

const createNewGame = async() => {
    const newBoardState = initialBoardState;
    const newGameId = createGameId();
    const newGame = new game({
        gameId: newGameId,
        boardState: newBoardState 
    });
    await newGame.save();
};


const retrieveBoardState = (gameId) => {
    return
};


const updateBoardState = (gameId, newBoardState) => {
    return 
};

const deleteGame = (gameId) => {
    return 
};


module.exports = {
    createNewGame,
    retrieveBoardState,
    updateBoardState, 
    deleteGame
}