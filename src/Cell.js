import React, { useRef } from 'react'
import { useGameContext } from './GameContext';
import { isLegalMove } from './GameLogic';


const diskColour = {
    1: "player-one",
    2: "player-two",
};

const Cell = ({cellState, cellIndex}) => {
    const {
        boardState,
        setColOfNewDisk, 
        moveCounter, 
        setMoveCounter, 
        isGameOver,
        colCursor,
        setCurrentCol,
    } = useGameContext();

    const cellRef = useRef();

    // need a way to keep track when this cell is first filled with a disk 
    // so this can be rendered with animation


    const selectNewDiskCol = async() => {
        const colOfNewDisk = cellIndex % 7;
        if (isLegalMove(boardState, colOfNewDisk) && (!isGameOver)) {
            // right now this is returning the diskref that you are clicking
            // not the cell with the new disk !!
            console.log(cellRef.current.getBoundingClientRect());
            setColOfNewDisk(colOfNewDisk);
            await setMoveCounter(moveCounter + 1);
            // wait for setMoveCounter to finish before useEffect in GameContext 
            // is executed with the updated value of moveCounter.
        }
    };

    const updateColCursor = () => {
        const newValOfColCursor = cellIndex % 7;
        if (newValOfColCursor !== colCursor) {
            setCurrentCol(newValOfColCursor);
        }
    };

    return (
        <div 
        className='game-cell'
        onClick={selectNewDiskCol}
        onMouseOver={updateColCursor}
        >
            <div ref={cellRef} className={`empty-disk-space`}/>
            {!cellState || <div className={`disk ${diskColour[cellState]}`}/>}
        </div>
    );
}

export default Cell;