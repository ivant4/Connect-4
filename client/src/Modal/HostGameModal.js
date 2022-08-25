import React, { useState, useRef } from 'react';
import CloseButton from '../Button/CloseButton';
import axios from 'axios';


const HostGameModal = ({showHostGameModal, setShowHostGameModal}) => {
    const [isWaitingForPlayerToJoin, setIisWaitingForPlayerToJoin] = useState(false);
    const [showNewGameId, setShowNewGameId] = useState(false);

    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);

    const closeHostGameModal = () => setShowHostGameModal(false);
    const getGameStatus = async(gameId) => {
        try {
            const gameStatus = await axios.get(`${API_URL_REF.current}/game-status`, {
                params: {
                    "game_id": gameId
                }
            });
            console.log(gameStatus);
        } catch (err) {
            console.log(err);
        }
    };

    const hostNewGame = async() => {
        const newGameId = await axios.post(`${API_URL_REF}/game-status`);
        /*
        let currentGameStatus = await getGameStatus(newGameId);
        while (currentGameStatus === "waiting") {
            currentGameStatus = setTimeout(() => getGameStatus(newGameId), 500);
        }
        setIsActivePlayer(true);
        setIsOnline(true);
        closeHostGameModal();
        */
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
                    onClick={() => getGameStatus(7972)}
                >
                        Host
                </button>
            </div>
        </div>
    );
};

export default HostGameModal;