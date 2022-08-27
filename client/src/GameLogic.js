const isLegalMove = (boardState, col) => {
    // is legal if there is an empty cell in this column
    for (let i = 0; i < 6; i++) {
        if (boardState[i][col] === 0) return true;
    }
    return false;
};

const findRowOfNewDisk = (boardState, col) => {
    for (let i = boardState.length - 1; i >= 0; i--) {
        if (boardState[i][col] === 0) {
            return i;
        }
    }
};


const hasBoardStateChanged = (oldBoardState, newBoardState) => {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (oldBoardState[row][col] !== newBoardState[row][col]) {
                return true;
            }
        }
    }
};

const findColOfNewDisk = (oldBoardState, newBoardState) => {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (oldBoardState[row][col] !== newBoardState[row][col]) {
                return col;
            }
        }
    }
};






const isWithinGameboard = (boardState, row, col) => {
    // check if the coordinate (row, col) is inside the gameboard dimension.
    return (
        row < boardState.length && row >= 0 && 
        col < boardState[0].length && col >= 0
    );
};

const adjDirPairs = [
    [[-1, -1], [1, 1]],
    [[-1, 0], [1, 0]],
    [[-1, 1], [1, -1]],
    [[0, -1], [0, 1]],
];

const hasActivePlayerWon = (boardState, playerNum, newDiskPos) => {
    for (const adjDirPair of adjDirPairs) {
        let numOfConsecutiveDisks = 0
        for (const adjDir of adjDirPair) {
            numOfConsecutiveDisks += findNumOfConsecutiveDisks(
                boardState,
                playerNum,
                newDiskPos,
                adjDir,
                0
            );
        }
        if (numOfConsecutiveDisks + 1 >= 4) return true;
    }
    return false;
};

const findNumOfConsecutiveDisks = (
    boardState,
    playerNum,
    DiskPos,
    dir,
    numOfConsecutiveDisks
) => {
    const rowOfAdjDisk = DiskPos[0] + dir[0];
    const colOfAdjDisk = DiskPos[1] + dir[1];
    if (!isWithinGameboard(
            boardState, 
            rowOfAdjDisk, 
            colOfAdjDisk,
        )) return numOfConsecutiveDisks;
    if (boardState[rowOfAdjDisk][colOfAdjDisk] === playerNum) {
        return findNumOfConsecutiveDisks(
            boardState,
            playerNum, 
            [rowOfAdjDisk, colOfAdjDisk], 
            dir,
            numOfConsecutiveDisks + 1
        );
    }
    return numOfConsecutiveDisks;
};

export {
    isLegalMove, 
    findRowOfNewDisk, 
    hasActivePlayerWon,
    hasBoardStateChanged,
    findColOfNewDisk
};