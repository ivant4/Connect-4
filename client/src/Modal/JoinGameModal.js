import React, { useState, useRef } from 'react';
import CloseButton from '../Button/CloseButton';
import axios from 'axios';

const JoinGameModal = ({showJoinGameModal, setShowJoinGameModal}) => {
    const [isGameIdFormDisabled, setIsGameIdFormDisabled] = useState(false);
    const [showInputErrMsg, setShowInputErrMsg] = useState(false);

    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);
    const gameIdRef = useRef();
    const errorMsgRef = useRef();

    const closeJoinGameModal = () => setShowJoinGameModal(false);

    const isGameIdInputValid = (gameIdInput) => {
        const gameId = parseInt(gameIdInput);
        if (gameId >= 0 && gameId < 9999) return true;
        return false;
    };

    const resetGameIdForm = (errorMsg) => {
        errorMsgRef.current = errorMsg;
        gameIdRef.current.value = "";
        setIsGameIdFormDisabled(false);
        setShowInputErrMsg(true);
    };

    const joinGame = async (e) => {
        e.preventDefault();
        await setIsGameIdFormDisabled(true);
        const gameIdInput = gameIdRef.current.value;
        if (isGameIdInputValid(gameIdInput)) {
            try {
                const response = await axios.patch(
                    `${API_URL_REF.current}/game-status/?player_status=join&game_id=${parseInt(gameIdInput)}`, 
                );
                if (response.status === 200) {
                    closeJoinGameModal();
                    // setIsOnline(true);
                    // setIsActivePlayer(false);
                } else if (response.status === 400) {
                    resetGameIdForm(
                        "Error message - game id is incorrect or two players has joined this game"
                    );
                }
            } catch (err) {
                console.log(err);
                resetGameIdForm("An internal error have occured !");
            }
        }
        resetGameIdForm("The input entered was invalid. Please enter a 4-digit number");
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
                    type="submit" 
                    id="game-id" 
                    disabled={isGameIdFormDisabled}
                >
                    Join
                </button>
            </form>
            {showInputErrMsg && <p>{errorMsgRef.current}</p>}
        </div>
    </div>
    );
}

export default JoinGameModal;