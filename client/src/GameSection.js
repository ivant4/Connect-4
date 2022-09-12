import React from 'react';
import GameBoard from './GameBoard';
import ColumnCursor from './ColumnCursor';
import GameOverModal from './Modal/GameOverModal'
import Utility from './Utility';
import OnlineGameOverModal from './Modal/OnlineGameOverModal';

const GameSection = () => {
    return (
        <>
            <div className='game-section'>
                <div className='game-container'>
                    <ColumnCursor/>
                    <GameBoard/>
                </div>
                <Utility/>
            </div>
            <OnlineGameOverModal/>
            <GameOverModal/>
        </>
    );
};

export default GameSection;