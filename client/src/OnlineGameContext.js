import React, {useContext, useEffect, useRef, useState} from 'react';
import { useGameContext, initialBoardState } from './GameContext';
import {areBoardStatesTheSame, findColOfNewDisk} from './GameLogic';
import {
    getGameStatus,
    getBoardState,
    postUpdatedBoardState,
    quitGameRequest
} from './RequestFunction';

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

    const waitAndGetBoardState= () => {
        return new Promise(resolve => {
            setTimeout(async() => {
                const currentGameStatus = await getBoardState(
                    API_URL_REF.current, 
                    onlineGameIdRef.current
                );
                resolve(currentGameStatus);
            }, 500);
        });
    };

    const getLatestBoardState = async(boardState) => {
        let latestBoardState = await getBoardState(
            API_URL_REF.current, 
            onlineGameIdRef.current
        );
        while (areBoardStatesTheSame(boardState, latestBoardState)) {
            latestBoardState = await waitAndGetBoardState();
            // if the game status changes to waiting the other player has quit
            const latestGameStatus = await getGameStatus(API_URL_REF.current, onlineGameIdRef.current);
            if (latestGameStatus === "waiting") quitOnlineMode();
        }
        return latestBoardState;
    };

    const waitForTheMoveOfActivePlayer = async(newMoveCounterVal, boardState) => {
        const latestBoardState = await getLatestBoardState(boardState);
        const colOfNewDisk = findColOfNewDisk(boardState, latestBoardState);
        isActivePlayerRef.current = true;
        await setColOfNewDisk(colOfNewDisk); 
        setMoveCounter(newMoveCounterVal); //update localBoardState to latestBoardState
    };

    useEffect(async() => {
        // runs when it goes online and offline
        if (!isOnline || isActivePlayerRef.current) return;
        waitForTheMoveOfActivePlayer(1, initialBoardState);
    }, [isOnline]);

    useEffect(async() => {
        // uploads the new move and waits for the other player
        if (!isOnline || isActivePlayerRef.current || moveCounter === 0) return;
        await postUpdatedBoardState(API_URL_REF.current, onlineGameIdRef.current, boardState);
        if (isGameOver) return;
        waitForTheMoveOfActivePlayer(moveCounter + 1, boardState);
    }, [boardState]);

    const resetOnlineGame = async() => {
        await resetGame();
        if (!isActivePlayerRef.current) {
            // the winning player goes second in the next game
            await postUpdatedBoardState(API_URL_REF.current, onlineGameIdRef.current, initialBoardState);
            waitForTheMoveOfActivePlayer(1, initialBoardState);
        } else {
            isActivePlayerRef.current = false;
            let isOtherPlayerPlaying = false;
            while (!isOtherPlayerPlaying) {
                const latestBoardState = await getBoardState(
                    API_URL_REF.current, 
                    onlineGameIdRef.current
                );
                if (areBoardStatesTheSame(initialBoardState, latestBoardState)) {
                    // when the other player wants to play another game, they reset the boardstate
                    isOtherPlayerPlaying = true;
                }
                const latestGameStatus = await getGameStatus(API_URL_REF.current, onlineGameIdRef.current);
                if (latestGameStatus === "waiting") {
                    // the other player has quitted
                    quitOnlineMode();
                    return;
                } 
            }
            isActivePlayerRef.current = true;
        }
    };

    const quitOnlineMode = async() => {
        await quitGameRequest(API_URL_REF.current, onlineGameIdRef.current);
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