import React, { useState, useRef } from 'react';
import CloseButton from '../Button/CloseButton';
import axios from 'axios';

const JoinGameModal = ({showJoinGameModal, setShowJoinGameModal}) => {
    const [isGameIdFormDisabled, setIsGameIdFormDisabled] = useState(false);
    const [showInputErrMsg, setShowInputErrMsg] = useState(false);

    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);
    const gameIdRef = useRef();

    const closeJoinGameModal = () => setShowJoinGameModal(false);

    const isGameIdInputValid = (gameIdInput) => {
        const gameId = parseInt(gameIdInput);
        if (gameId >= 0 && gameId < 9999) return true;
        return false;
    }

    const joinGame = async (e) => {
        e.preventDefault();
        await setIsGameIdFormDisabled(true);
        const gameIdInput = gameIdRef.current.value;
        console.log(gameIdInput, typeof gameIdInput);
        console.log(isGameIdInputValid(gameIdInput));
        if (isGameIdInputValid(gameIdInput)) {
            try {
                const response = await axios.post(
                    `${API_URL_REF.current}/game-status`, 
                    {params: { "game_id": parseInt(gameIdInput) }
                });
                closeJoinGameModal();
            } catch (err) {
                console.log(err);
            }
        } else {
            setIsGameIdFormDisabled(false);
            setShowInputErrMsg(true);
            gameIdRef.current.value = "";
        }
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
        </div>
    </div>
    );
}

export default JoinGameModal;