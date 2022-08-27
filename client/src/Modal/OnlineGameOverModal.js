import React from 'react'
import { useGameContext } from '../GameContext';
import { useOnlineGameContext } from '../OnlineGameContext';

const OnlineGameOverModal = () => {
    const {
        isGameOver,
    } = useGameContext();

    const {
        isOnline,
        isActivePlayerRef,
        resetOnlineGame,
        quitOnlineMode,
    } = useOnlineGameContext();

    return (
        <div className={`modal-container ${isGameOver && isOnline && "is-open game-over-modal"}`}>
            <div className='modal-content'>
                <h2>
                    Well played! 
                    {isActivePlayerRef.current === true? " " : " You won !"}  
                    <br/>Would you like to play again ? 
                </h2>
                <button 
                    className='btn' 
                    onClick={resetOnlineGame}
                >
                    Yes
                </button>
                <button 
                    className='btn' 
                    onClick={quitOnlineMode}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default OnlineGameOverModal;