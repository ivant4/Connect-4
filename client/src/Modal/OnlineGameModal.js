import React, { useState } from 'react'
//import { useGameContext } from '../GameContext';
import CloseButton from '../Button/CloseButton';
import HostGameModal from './HostGameModal';
import JoinGameModal from './JoinGameModal';

const OnlineGameModal = ({showOnlineGameModal, setShowOnlineGameModal}) => {
    const [showHostGameModal, setShowHostGameModal] = useState(false);
    const [showJoinGameModal, setShowJoinGameModal] = useState(false);

    const openNextModal = (setShowNextModal) => {
        setShowOnlineGameModal(false);
        setShowNextModal(true);
    };
    if (showHostGameModal) {
        return (
            <HostGameModal 
                showHostGameModal={showHostGameModal}
                setShowHostGameModal={setShowHostGameModal}
            />
        );
    } else if (showJoinGameModal) {
        return (
            <JoinGameModal 
                showJoinGameModal={showJoinGameModal}
                setShowJoinGameModal={setShowJoinGameModal}
            />
        );
    } else {
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
                        onClick={() => openNextModal(setShowHostGameModal)}
                    >
                        Host
                    </button>
                    <button 
                        className='btn join-btn' 
                        onClick={() => openNextModal(setShowJoinGameModal)}
                    >
                        Join
                    </button>
                </div>
            </div>
        );
    }
}

export default OnlineGameModal;