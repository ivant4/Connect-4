import React, { useEffect, useRef } from 'react'
import { useGameContext } from './GameContext';
import { isLegalMove } from './GameLogic';
import { useOnlineGameContext } from './OnlineGameContext';

const diskColour = {
    0: "empty",
    1: "player-one",
    2: "player-two",
};

const Cell = ({ cellState, cellIndex }) => {
    const {
        boardState,
        setColOfNewDisk, 
        moveCounter, 
        setMoveCounter, 
        isGameOver,
        colCursor,
        setCurrentCol,
        cellIndexOfNewDisk,
    } = useGameContext();

    const {
        isOnline,
        isActivePlayerRef,
    } = useOnlineGameContext();

    const cellRef = useRef();

    // renders one of new disk or fixed disk
    const isAnimating = cellIndexOfNewDisk === cellIndex;

    const updateNewDiskAnimation = () => {
        // sets the top margin and animation duration of the falling-disk animation 
        const rowOfNewDisk = Math.floor(cellIndexOfNewDisk / 7);
        const boundingRectOfCell = cellRef.current.getBoundingClientRect();
        const cellHeight = boundingRectOfCell.height;
        const topOfNewDiskAtStart = boundingRectOfCell.top - ((rowOfNewDisk) * cellHeight);
        const topOfNewDiskAtFinish = boundingRectOfCell.top;
        const fallingDistOfNewDisk = topOfNewDiskAtFinish - topOfNewDiskAtStart;
        const FALLING_DURATION_CONSTANT = 0.02;
        // chosen so that the fall duration is not too long/short 
        const fallDuration = FALLING_DURATION_CONSTANT*Math.sqrt(fallingDistOfNewDisk);
        // falling distance is proportional to the square of the falling duration 
        document.documentElement.style.setProperty('--startTopOfNewDisk', `${topOfNewDiskAtStart}px`);
        document.documentElement.style.setProperty('--finishTopOfNewDisk', `${topOfNewDiskAtFinish}px`);
        document.documentElement.style.setProperty('--fallDuration', `${fallDuration}s`);
    };

    const selectNewDiskCol = async() => {
        // need to disable the cells for active player after they have clicked once !!!
        if (isOnline && !isActivePlayerRef.current) return; // do nothing if you are not the active player
        isActivePlayerRef.current = false;
        const colOfNewDisk = cellIndex % 7;
        if (isLegalMove(boardState, colOfNewDisk) && (!isGameOver)) {
            await setColOfNewDisk(colOfNewDisk);
            setMoveCounter(moveCounter + 1);
        }
    };

    const updateColCursor = () => {
        const newValOfColCursor = cellIndex % 7;
        if (newValOfColCursor !== colCursor) {
            setCurrentCol(newValOfColCursor);
        }
    };

    useEffect(() => {
        if (isAnimating) {
            updateNewDiskAnimation();
        }
    }, [cellIndexOfNewDisk]);

    return (
        <div 
        className='game-cell'
        onClick={selectNewDiskCol}
        onMouseOver={updateColCursor}
        ref={cellRef}
        >
            <div 
            className={`empty-disk-space`} 
            />
            <div 
            className={`${isAnimating ? "new-disk":"fixed-disk"} ${diskColour[cellState]}`}
            />
        </div>
    );
};

export default Cell;