import React, { useState } from 'react';
import CloseButton from '../Button/CloseButton';
import axios from 'axios';


const HostGameModal = ({showHostGameModal, setShowHostGameModal}) => {
    const [isGettingGameId, setIsGettingGameId] = useState(true);
    const [isWaitingForPlayerToJoin, setIisWaitingForPlayerToJoin] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL;

    const closeHostGameModal = () => setShowHostGameModal(false);
    const getGameStatus = async(gameId) => {
        try {
            console.log(await axios.get(`${API_URL}/game-status`, {
                params: {
                    "game_id": 7717
                }
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const hostNewGame = async() => {
        /*
        const newGameId = await axios.post(API_URL);
        let currentGameStatus = await getGameStatus();
        while (currentGameStatus === "waiting") {
            currentGameStatus = setTimeout(getGameStatus, 500);
        }
        */
        closeHostGameModal();
    };

    return (
        <div className={`modal-container ${showHostGameModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Hosting a game
                    </h2>
                    <CloseButton setShowFunc={setShowHostGameModal}/>
                </div>
                <button 
                    className='btn host-btn'
                    onClick={() => getGameStatus(7717)}
                >
                        Host
                </button>
            </div>
        </div>
    );
};

export default HostGameModal;