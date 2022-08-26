import React, { useState, useRef, useEffect } from 'react';
import CloseButton from '../Button/CloseButton';
import axios from 'axios';

// close the game while waiting the game does not delete the game in the database
const HostGameModal = ({showHostGameModal, setShowHostGameModal}) => {
    const [showNewGameId, setShowNewGameId] = useState(false);
    const newGameIdRef = useRef(0);

    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);

    const closeHostGameModal = () => setShowHostGameModal(false);

    const getGameStatus = async(gameId) => {
        try {
            const response = await axios.get(`${API_URL_REF.current}/game-status`, {
                params: {
                    "game_id": gameId
                }
            });
            return response.data.gameStatus;
        } catch (err) {
            console.log(err);
        }
    };

    const waitAndGetGameStatus = () => {
        return new Promise(resolve => {
            setTimeout(async() => {
                const currentGameStatus = await getGameStatus(newGameIdRef.current);
                resolve(currentGameStatus);
            }, 500);
        });
    };

    const waitForPlayerToJoin = async(newGameId) => {
        let currentGameStatus = await getGameStatus(newGameId);
        while (currentGameStatus === "waiting") {
            currentGameStatus = await waitAndGetGameStatus();
        }
        if (currentGameStatus === "playing") {
            //setIsActivePlayer(true);
            //setIsOnline(true);
            closeHostGameModal();
        } else {
            // handle invalid game status
        }
    };

    const hostNewGame = async() => {
        const response = await axios.post(`${API_URL_REF.current}/game-status`);
        const newGameId = response.data.gameId;
        newGameIdRef.current = newGameId;
        setShowNewGameId(true);
        waitForPlayerToJoin(newGameId);
    };

    useEffect(()=> {
        if (showHostGameModal) {
            hostNewGame();
        }
    }, [showHostGameModal]);

    return (
        <div className={`modal-container ${showHostGameModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Hosting a game
                    </h2>
                    <CloseButton setShowFunc={setShowHostGameModal}/>
                </div>
                {showNewGameId === true? 
                    <p>
                        Your game Id is {newGameIdRef.current} <br/>
                        Waiting for the other player to join...
                    </p>
                :
                    <p>Retrieving your new game ID ... </p>
                }
            </div>
        </div>
    );
};

export default HostGameModal;