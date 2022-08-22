import React, { useEffect, useRef } from 'react'
import { useGameContext } from './GameContext';

const ColumnCursor = () => {
    const {currentCol} = useGameContext(); 
    const isInitialRender = useRef(true);

    useEffect(() => {
        // update the col cursor position
        if (!isInitialRender.current) {
            const colWidth = document
                            .getElementsByClassName("game-cell")[0]
                            .clientWidth;
            const widthOfGameboard = document
                            .getElementsByClassName("gameboard")[0]
                            .clientWidth;
            const cursorOffset = (widthOfGameboard - 7 * colWidth) / 2;
            // cursor offset equals to the padding of the gameboard
            const marginLeftOfColCursor = cursorOffset + currentCol * colWidth;
            document.documentElement.style.setProperty('--marginLeftOfColCursor', `${marginLeftOfColCursor}px`);
        } else {
            isInitialRender.current = false;
        }
    }, [currentCol]);
    return (
        <div className='column-cursor'/>
    );
}

export default ColumnCursor;