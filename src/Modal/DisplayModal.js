import React from 'react'
import { useGameContext } from '../GameContext';

const GameOverModal = () => {
    const {
        winningPlayerNum,
        isGameOver,
        resetGame,
    } = useGameContext();

    return (
        <div className={`modal-container ${isGameOver && "is-open"}`}>
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