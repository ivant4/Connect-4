import React from 'react';
import CloseButton from '../Button/CloseButton';

const RulesModal = ({ showRulesModal, setShowRulesModal }) => {
    return (
        <div className={`modal-container ${showRulesModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Rules of the Game
                    </h2>
                    <CloseButton setShowFunc={setShowRulesModal}/>
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