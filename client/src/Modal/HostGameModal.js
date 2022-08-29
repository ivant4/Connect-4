import React, { useState, useRef, useEffect } from 'react';
import CloseButton from '../Button/CloseButton';
import { getGameStatus, createNewOnlineGame } from '../RequestFunction';
import { useOnlineGameContext } from '../OnlineGameContext';
import { useGameContext } from '../GameContext';

const HostGameModal = ({showHostGameModal, setShowHostGameModal}) => {
    const {
        isActivePlayerRef,
        setIsOnline,
        onlineGameIdRef,
        API_URL_REF,
    } = useOnlineGameContext();
    const {resetGame} = useGameContext();
    const [showNewGameId, setShowNewGameId] = useState(false);

    const closeHostGameModal = () => setShowHostGameModal(false);

    const waitAndGetGameStatus = () => {
        return new Promise(resolve => {
            setTimeout(async() => {
                const currentGameStatus = await getGameStatus(API_URL_REF.current, onlineGameIdRef.current);
                resolve(currentGameStatus);
            }, 500);
        });
    };

    const waitForPlayerToJoin = async(newGameId) => {
        let currentGameStatus = await getGameStatus(API_URL_REF.current, newGameId);
        while (currentGameStatus === "waiting") {
            currentGameStatus = await waitAndGetGameStatus();
        }
        // the other player has joined
        isActivePlayerRef.current = true;
        Promise.all([
            resetGame(),
            setIsOnline(true)
        ]);
        closeHostGameModal();
    };

    const hostNewGame = async() => {
        const newGameId = await createNewOnlineGame(API_URL_REF.current);
        onlineGameIdRef.current = newGameId;
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
                        Your game Id is {onlineGameIdRef.current} <br/>
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