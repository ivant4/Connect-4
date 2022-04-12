import React, {useContext, useEffect, useState} from 'react';
import {
    isLegalMove, 
    findRowOfNewDisk, 
    hasActivePlayerWon
} from './GameLogic';
const GameContext = React.createContext();

const initialBoardState = [];
for (let i = 0; i < 6; i++) {
    initialBoardState[i] = [];
    for (let j = 0; j < 7; j++) {
        initialBoardState[i][j] = 0;
    }
}

const GameContextProvider = ({children}) => {
    // the children being passed in is the app component!!!
    const [boardState, setBoardState] = useState(initialBoardState.map(elem => [...elem]));
    const [activePlayerNum, setActivePlayerNum] = useState(1);
    const [colOfNewDisk, setColOfNewDisk] = useState(0);
    const [winningPlayerNum, setWinningPlayerNum] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [moveCounter, setMoveCounter] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);

    useEffect(() => {
        if (moveCounter === 0) return; // during inital render and game resets
        const rowOfNewDisk = findRowOfNewDisk(boardState, colOfNewDisk);
        boardState[rowOfNewDisk][colOfNewDisk] = activePlayerNum;
        setBoardState(boardState);
        if (hasActivePlayerWon(
            boardState, 
            activePlayerNum, 
            [rowOfNewDisk, colOfNewDisk]
        )) { 
            setWinningPlayerNum(activePlayerNum);
            setIsGameOver(true);
        } else if (moveCounter >= 42) { 
            // Draw
            setIsGameOver(true);
        } else {
            const nextActivePlayerNum = activePlayerNum === 1 ? 2 : 1;
            setActivePlayerNum(nextActivePlayerNum);
        }
    }, [moveCounter]);

    const resetGame = () => {
        setActivePlayerNum(1);
        setBoardState(initialBoardState.map(elem => [...elem]));
        setMoveCounter(0);
        setIsGameOver(false);
        setWinningPlayerNum(0);
    };
    
    return <GameContext.Provider value={{
        boardState, 
        activePlayerNum,
        colOfNewDisk,
        setColOfNewDisk,
        moveCounter, 
        setMoveCounter,
        winningPlayerNum,
        isGameOver,
        resetGame,
        currentCol,
        setCurrentCol,
    }}> 
        {children}
    </GameContext.Provider>
};

const useGameContext = () => {
    return useContext(GameContext);
}

export {useGameContext, GameContextProvider};
