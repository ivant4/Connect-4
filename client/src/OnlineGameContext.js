import React, {useContext, useEffect, useRef, useState} from 'react';
import { useGameContext, initialBoardState } from './GameContext';
import {hasBoardStateChanged, findColOfNewDisk} from './GameLogic';
import axios from 'axios';

const OnlineGameContext = React.createContext();

const OnlineGameContextProvider = ({children}) => {
    const [isOnline, setIsOnline] = useState(false);
    const isActivePlayerRef = useRef(); 
    const onlineGameIdRef = useRef();
    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);
    const {
        boardState,
        setColOfNewDisk,
        moveCounter,
        setMoveCounter,
        resetGame,
        isGameOver,
    } = useGameContext();

    const getBoardState = async() => {
        try {
            const response = await axios.get(`${API_URL_REF.current}/board-state`, {
                params: {
                    "game_id": onlineGameIdRef.current
                },
            });
            return response.data.boardState;
        } catch (err) {
            console.log(err);
        }
    };

    const postUpdatedBoardState = async(boardState) => {
        try {
            await axios.patch(`${API_URL_REF.current}/board-state`, {
                params: {
                    "game_id": onlineGameIdRef.current
                },
                data: {
                    boardState
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const waitAndGetBoardState= () => {
        return new Promise(resolve => {
            setTimeout(async() => {
                const currentGameStatus = await getBoardState();
                resolve(currentGameStatus);
            }, 500);
        });
    };

    const getUpdatedBoardState = async(boardState) => {
        let latestBoardState = await getBoardState();
        while (!hasBoardStateChanged(boardState, latestBoardState)) {
            latestBoardState = await waitAndGetBoardState();
            // if the game status changes to waiting the other player has quit
        }
        return latestBoardState;
    };

    const waitForTheMoveOfActivePlayer = async(newMoveCounterVal, boardState) => {
        const updatedBoardState = await getUpdatedBoardState(boardState);
        console.log(boardState, updatedBoardState);
        const colOfNewDisk = findColOfNewDisk(boardState, updatedBoardState);
        isActivePlayerRef.current = true;
        await setColOfNewDisk(colOfNewDisk); 
        setMoveCounter(newMoveCounterVal); //update localBoardState to updatedBoardState
    };

    useEffect(async() => {
        // runs when it goes online and offline
        if (!isOnline || isActivePlayerRef.current) return;
        console.log(initialBoardState);
        waitForTheMoveOfActivePlayer(1, initialBoardState);
    }, [isOnline]);

    useEffect(async() => {
        // uploads the new move and waits for the other player
        if (!isOnline || isActivePlayerRef.current || moveCounter === 0) return;
        await postUpdatedBoardState(boardState);
        if (isGameOver) return;
        waitForTheMoveOfActivePlayer(moveCounter + 1, boardState);
    }, [boardState]);

    const resetOnlineGame = async() => {
        await resetGame();
        if (!isActivePlayerRef.current) {
            // the winning player goes second
            await postUpdatedBoardState(initialBoardState);
            waitForTheMoveOfActivePlayer(1, initialBoardState);
        } else {
            isActivePlayerRef.current = false;
            const isOtherPlayerPlaying = false;
            while (!isOtherPlayerPlaying) {
                const updatedBoardState = await getBoardState();
                if (!hasBoardStateChanged(initialBoardState, updatedBoardState)) {
                    isOtherPlayerPlaying = true;
                }
                const response = await axios.get(`${API_URL_REF.current}/game-status`, {
                params: {
                    "game_id": onlineGameIdRef.current
                }
            });
                if (response.data.gameStatus === "waiting") {
                    // the other player has quitted
                    quitOnlineMode();
                    return;
                } 
            }
            isActivePlayerRef.current = true;
        }
    };
    const quitOnlineMode = async() => {
        const response = await axios.patch(
            `${API_URL_REF.current}/game-status/?player_status=quit&game_id=${onlineGameIdRef.current}`
        );
        onlineGameIdRef.current = null;
        await setIsOnline(false);
        resetGame();
    };

    return <OnlineGameContext.Provider value={{
        isOnline,
        setIsOnline,
        isActivePlayerRef,
        onlineGameIdRef,
        API_URL_REF,
        resetOnlineGame,
        quitOnlineMode
    }}> 
        {children}
    </OnlineGameContext.Provider>
};

const useOnlineGameContext = () => {
    return useContext(OnlineGameContext);
};

export {useOnlineGameContext, OnlineGameContextProvider};