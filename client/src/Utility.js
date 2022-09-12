import React from 'react';
import TurnIndicator from './TurnIndicator';
import { useGameContext } from './GameContext';
import { useOnlineGameContext } from './OnlineGameContext';

const Utility = () => {
    const {resetGame} = useGameContext();
    const { 
        isOnline,
        quitOnlineMode
    } = useOnlineGameContext();
    return (
        <div className='utility-container'>
            <TurnIndicator/>
            {isOnline === true? 
                <button className='btn quit-btn' onClick={quitOnlineMode}>Quit</button>
            :
                <button className='btn reset-btn' onClick={resetGame}>Reset</button>
            }
        </div>
    );
};

export default Utility;