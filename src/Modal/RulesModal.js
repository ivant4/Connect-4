import React from 'react'

const RulesModal = ({setshowRulesModal}) => {
    const closeRulesModal = () => {
        setshowRulesModal(false);
    }
    return (
        <div className="modal-container is-open">
            <div className='modal-content'>
                <button 
                className='btn exit-btn' 
                onClick={closeRulesModal}
                >
                    x
                </button>
                <p>
                    The aim of the game is to be the first player to 
                    form a horizontal, vertical or diagonal row of 4 disks
                    with each player taking turns dropping a disk into the
                    grid. 
                </p>
            </div>
        </div>
    );
}

export default RulesModal;