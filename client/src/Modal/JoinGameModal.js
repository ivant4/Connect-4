import React, { useState, useRef } from 'react';
import CloseButton from '../Button/CloseButton';
import { useOnlineGameContext } from '../OnlineGameContext';
import { joinGameRequest } from '../RequestFunction';
import { useGameContext } from '../GameContext';

const JoinGameModal = ({ showJoinGameModal, setShowJoinGameModal }) => {
    const {
        setIsOnline,
        API_URL_REF,
        isActivePlayerRef,
        onlineGameIdRef,
    } = useOnlineGameContext();
    const {resetGame} = useGameContext();

    const [isGameIdFormDisabled, setIsGameIdFormDisabled] = useState(false);
    const [showInputErrMsg, setShowInputErrMsg] = useState(false);

    const gameIdRef = useRef("");
    const errorMsgRef = useRef("");

    const closeJoinGameModal = () => setShowJoinGameModal(false);

    const isGameIdInputValid = (gameIdInput) => {
        const gameId = parseInt(gameIdInput);
        if (gameId >= 0 && gameId <= 9999) return true;
        return false;
    };

    const resetGameIdForm = (errorMsg) => {
        errorMsgRef.current = errorMsg;
        gameIdRef.current = "";
        setShowInputErrMsg(true);
        setIsGameIdFormDisabled(false);
    };

    const joinGame = async(e) => {
        e.preventDefault();
        await setIsGameIdFormDisabled(true);
        const gameIdInput = gameIdRef.current.value;
        if (isGameIdInputValid(gameIdInput)) {
            try {
                const gameId = parseInt(gameIdInput);
                const response = await joinGameRequest(API_URL_REF.current, gameId);
                if (response.status === 200) {
                    onlineGameIdRef.current = gameId;
                    isActivePlayerRef.current = false;
                    Promise.all([
                        resetGame(),
                        setIsOnline(true)
                    ]);
                    closeJoinGameModal();
                } else if (response.status === 400) {
                    resetGameIdForm(
                        "Game id entered was incorrect or two players has already joined this game"
                    );
                }
            } catch (err) {
                console.log(err);
                resetGameIdForm("An internal error have occured !");
            }
        }
        resetGameIdForm("The input entered was invalid. Please enter a 4-digit number.");
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
            <form onSubmit={joinGame}>
                <label htmlFor='game-id'>
                    Game Id: 
                </label>
                <input 
                    type="text" 
                    required 
                    id="game-id" 
                    ref={gameIdRef}
                    disabled={isGameIdFormDisabled}
                />
                <button 
                    className='join-btn btn'
                    type="submit" 
                    id="game-id" 
                    disabled={isGameIdFormDisabled}
                >
                    Join
                </button>
            </form>
            {showInputErrMsg && <p>{showInputErrMsg && errorMsgRef.current}</p>}
            </div>
        </div>
    );
}

export default JoinGameModal;