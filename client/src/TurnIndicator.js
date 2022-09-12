import React from 'react';
import { useGameContext } from './GameContext';

const playerCSSClasses = {
    1: "player-one",
    2: "player-two",
}

const TurnIndicator = () => {
    const { activePlayerNum } = useGameContext();
    return (
        <div className='turn-indicator'>
            <h2>Turn</h2>
            <div 
            className={`fixed-disk ${playerCSSClasses[activePlayerNum]} player-counter`}
            />
        </div>
    );
};

export default TurnIndicator;