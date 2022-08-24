import React, { useState } from 'react'
//import { useGameContext } from '../GameContext';
import CloseButton from '../Button/CloseButton';

const OnlineGameModal = ({showOnlineGameModal, setShowOnlineGameModal}) => {
    const [showHostGameModal, setShowHostGameModal] = useState(false);
    const [showJoinGameModal, setShowJoinGameModal] = useState(false);

    const openNextModal = (setShowNextModal) => {
        setShowOnlineGameModal(false);
        setShowNextModal(true);
    };

    return (
        <div className={`modal-container ${showOnlineGameModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Host/Join a Game
                    </h2>
                    <CloseButton setShowFunc={setShowOnlineGameModal}/>
                </div>
                <p>
                    Would you like to host/join an online game ?
                </p>
                <button 
                    className='btn host-btn'
                    showHostGameModal
                    setShowHostGameModal
                >
                    Host
                </button>
                <button 
                    className='btn join-btn' 
                >
                    Join
                </button>
            </div>
        </div>
    );
}

export default OnlineGameModal;