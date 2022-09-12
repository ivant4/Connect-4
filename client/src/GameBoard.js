import React from 'react';
import Cell from './Cell';
import ColumnCursor from './ColumnCursor';
import { useGameContext } from './GameContext';

const GameBoard = () => {
    const { boardState } = useGameContext();
    return (
        <div className='gameboard'>
            {
                boardState.flat().map((cellState, index) => {
                    return <Cell
                    key={index} 
                    cellState={cellState} 
                    cellIndex={index}
                    />
                })
            }
        </div>
    );
};

export default GameBoard;