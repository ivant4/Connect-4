import React, {useState} from 'react';
import GameBoard from './GameBoard';
import ColumnCursor from './ColumnCursor';
import GameOverModal from './Modal/GameOverModal';
import { useGameContext } from './GameContext';
import Utility from './Utility';

const GameSection = () => {
    const {
        activePlayerNum,
        resetGame
    } = useGameContext();
    return (
        <>
            <div className='game-section'>
                <div className='game-container'>
                    <ColumnCursor/>
                    <GameBoard/>
                </div>
                <Utility/>
            </div>
            <GameOverModal/>
            
        </>
    );
};

export default GameSection;