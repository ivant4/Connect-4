import React from 'react'
import { useGameContext } from '../GameContext';
import { useOnlineGameContext } from '../OnlineGameContext';

const GameOverModal = () => {
    const {
        winningPlayerNum,
        isGameOver,
        resetGame,
    } = useGameContext();

    const {isOnline} = useOnlineGameContext();

    return (
        <div className={`modal-container ${isGameOver && !isOnline && "is-open game-over-modal"}`}>
            <div className='modal-content'>
                <h2>
                    Well played ! 
                    {
                        winningPlayerNum === 0 ? " It's a draw!":
                        ` Player ${winningPlayerNum} has won the game!`
                    }
                </h2>
                <button 
                    className='btn' 
                    onClick={resetGame}
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GameOverModal;