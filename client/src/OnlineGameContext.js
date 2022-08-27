import React, {useContext, useEffect, useRef, useState} from 'react';
import { useGameContext } from './GameContext';
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
    } = useGameContext();

    const resetOnlineGame = async() => {

    };

    const quitOnlineMode = async() => {
        const response = await axios.patch(
            `${API_URL_REF.current}/game-status/?player_status=quit&game_id=${onlineGameIdRef.current}`
        );
        onlineGameIdRef.current = null;
        setIsOnline(false);
        resetGame();
    };

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

    const setBoardState = async() => {
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

    const getUpdatedBoardState = async() => {
        let newBoardState = await getBoardState();
        while (!hasBoardStateChanged(boardState, newBoardState)) {
            newBoardState = await waitAndGetBoardState();
        }
        return newBoardState;
    };

    useEffect(async() => {
        // runs when it goes online and offline
        if (!isOnline || isActivePlayerRef.current) return;
        const updatedBoardState = await getUpdatedBoardState();
        const colOfNewDisk = findColOfNewDisk(boardState, updatedBoardState);
        isActivePlayerRef.current = true;
        await setColOfNewDisk(colOfNewDisk);
        await setMoveCounter(2);
    }, [isOnline]);

    useEffect(async() => {
        // uploads the new move and waits for the other player
        if (!isOnline || isActivePlayerRef.current) return;
        await setBoardState();
        const updatedBoardState = await getUpdatedBoardState();
        const colOfNewDisk = findColOfNewDisk(boardState, updatedBoardState);
        isActivePlayerRef.current = true;
        await setColOfNewDisk(colOfNewDisk);
        await setMoveCounter(moveCounter + 1);
    }, [boardState]);

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