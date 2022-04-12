import React from 'react'
import { useGameContext } from '../GameContext';

const GameOverModal = () => {
    const {
        winningPlayerNum,
        isGameOver,
        resetGame,
    } = useGameContext();
    if (isGameOver) {
        return (
            <div className='modal-container'>
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
    return <></>
}

export default GameOverModal;