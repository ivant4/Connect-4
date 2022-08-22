import React, {useState} from 'react';
import TurnIndicator from './TurnIndicator';
import { useGameContext } from './GameContext';

const Utility = () => {
    const {resetGame} = useGameContext();
    return (
        <div className='utility'>
            <TurnIndicator/>
            <button className='btn reset-btn' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default Utility;