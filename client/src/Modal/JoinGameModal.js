import React, { useState } from 'react';
import CloseButton from '../Button/CloseButton';

const JoinGameModal = ({showJoinGameModal, setShowJoinGameModal}) => {
    const [isJoiningGame, setIsJoiningGame] = useState(true);

    return (
        <div className={`modal-container ${showJoinGameModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Joining a game
                    </h2>
                    <CloseButton setShowFunc={setShowJoinGameModal}/>
                </div>
            </div>
        </div>

    );
}

export default JoinGameModal;