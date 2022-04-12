import React, {useState} from 'react';
import GameBoard from './GameBoard';
import ColumnCursor from './ColumnCursor';
import GameOverModal from './Modal/GameOverModal';

const GameSection = () => {
    return (
        <>
            <div className='game-section'>
                <div className='game-container'>
                    <ColumnCursor/>
                    <GameBoard/>
                </div>
            </div>
            <GameOverModal/>
        </>
    );
};

export default GameSection;