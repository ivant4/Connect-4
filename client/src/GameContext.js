import React, {useContext, useEffect, useRef, useState} from 'react';
import {
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
    const [activePlayerNum, setActivePlayerNum] = useState(1); // can this be useRef ? - turn indicator rerender
    const [colOfNewDisk, setColOfNewDisk] = useState(0); // can this be useRef ? setMoveCounter triggers rerender anyways
    const [isGameOver, setIsGameOver] = useState(false);
    const [moveCounter, setMoveCounter] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const cellIndexOfNewDisk = useRef();
    const winningPlayerNum = useRef(0);

    useEffect(() => {
        if (moveCounter === 0) return; // during inital render and game resets
        const rowOfNewDisk = findRowOfNewDisk(boardState, colOfNewDisk);
        cellIndexOfNewDisk.current = (rowOfNewDisk * 7) + colOfNewDisk;
        const newBoardState = boardState.map(elem => [...elem]);
        newBoardState[rowOfNewDisk][colOfNewDisk] = activePlayerNum;
        setBoardState(newBoardState);
        if (hasActivePlayerWon(
            boardState, 
            activePlayerNum, 
            [rowOfNewDisk, colOfNewDisk]
        )) {
            winningPlayerNum.current = activePlayerNum; 
            setIsGameOver(true);
        } else if (moveCounter >= 42) { 
            // Draw
            setIsGameOver(true);
        } else {
            const nextActivePlayerNum = activePlayerNum === 1 ? 2 : 1;
            setActivePlayerNum(nextActivePlayerNum);
        }
    }, [moveCounter]);

    const resetGame = async () => {
        await setIsGameOver(false); 
        // to prevent the gameover Modal from updating to an incorrect message
        setActivePlayerNum(1);
        setBoardState(initialBoardState.map(elem => [...elem]));
        setMoveCounter(0);
        winningPlayerNum.current = 0;
        cellIndexOfNewDisk.current = undefined;
    };
    
    return <GameContext.Provider value={{
        boardState, 
        activePlayerNum,
        colOfNewDisk,
        setColOfNewDisk,
        moveCounter, 
        setMoveCounter,
        isGameOver,
        resetGame,
        currentCol,
        setCurrentCol,
        cellIndexOfNewDisk: cellIndexOfNewDisk.current,
        winningPlayerNum: winningPlayerNum.current,
    }}> 
        {children}
    </GameContext.Provider>
};

const useGameContext = () => {
    return useContext(GameContext);
}

export {useGameContext, GameContextProvider, initialBoardState};
