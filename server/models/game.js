const mongoose = require("mongoose");


/* 
 * The name of the database is entered as a part of the collection string 
 * as the first part of connection options. 
 * The first string argument in the model function is the collection name in 
 * the database.
 */

const isValidBoardState = (boardState) => {
    // check that the board state is the right dimension
    if (boardState.length !== 6 || 
        boardState[0].length !== 7) {
            return false;
        }
    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[0].length; col++) {
            cellValue = boardState[row][col];
            // each cell value should be a number
            if (typeof cellValue !== "number") return false;
            // each cell value should be taken by player 1 or 2 or unoccupied (0)
            if (cellValue > 2 || cellValue < 0) {
                    return false;
            }
        }
    }
    return true
};

const gameSchema = new mongoose.Schema({
    gameId: {
        type: Number,
        required: [true, 'Must provide a game Id'],
    },
    boardState: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Must provide a valid board state'],
        validate: {
           validator: isValidBoardState
        }
    },
    activePlayerNumber: {
        type: Number,
        required: [true, 'The active player number is not provided!'],
        min: 1,
        max: 2
    },
    gameStatus: {
        type: String,
        required: [true, "The game status is not provided !"]
    }
});

module.exports = mongoose.model('games', gameSchema);