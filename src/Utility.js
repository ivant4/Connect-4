import React from 'react';
import { useGameContext } from './GameContext';

const Utility = () => {
    const {
        activePlayerNum,
        resetGame
    } = useGameContext();

    return (
        <div className='utility'>
            <button onClick={resetGame}>Reset</button>
            <h2>Player {activePlayerNum}'s Turn</h2>
        </div>
    );
};

export default Utility;