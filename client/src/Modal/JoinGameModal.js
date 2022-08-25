import React, { useState } from 'react';
import CloseButton from '../Button/CloseButton';

const JoinGameModal = ({showJoinGameModal, setShowJoinGameModal}) => {
    const [isJoiningGame, setIsJoiningGame] = useState(true);
    const closeJoinGameModal = () => setShowJoinGameModal(false);
    const API_URL = process.env.REACT_APP_API_URL;

    const joinGame = async(gameId) => {
        /*
        try {
            const response = await axios.patch();
        } catch (err) {
            console.log(err);
        }
        */
        closeJoinGameModal();
    };

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