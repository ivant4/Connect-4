import React from 'react'

const RulesModal = ({ showRulesModal, setshowRulesModal}) => {
    const closeRulesModal = () => {
        setshowRulesModal(false);
    }
    return (
        <div className={`modal-container ${showRulesModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Rules of the Game
                    </h2>
                    <button 
                    className='btn exit-btn' 
                    onClick={closeRulesModal}
                    >
                        x
                    </button>
                </div>
                <p>
                    The aim of the game is to be the first player to 
                    form a horizontal, vertical or diagonal row of 4 disks
                    with each player taking turns to drop a disk into the
                    grid. 
                </p>
            </div>
        </div>
    );
}

export default RulesModal;