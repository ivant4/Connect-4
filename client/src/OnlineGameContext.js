import React, {useContext, useEffect, useRef, useState} from 'react';
import { useGameContext } from './GameContext';
import axios from 'axios';

const OnlineGameContext = React.createContext();

const OnlineGameContextProvider = ({children}) => {
    const [isOnline, setIsOnline] = useState(false);
    const [isActivePlayer, setIsActivePlayer] = useState(false);
    const [thisPlayerMoveCounter, setThisPlayerMoveCounter] = useState(0);

    const isActivePlayerRef = useRef(); 
    const onlineGameIdRef = useRef();
    // ensures useEffect doesn't run during initial render and only when
    // you update the board
    const API_URL_REF = useRef(process.env.REACT_APP_API_URL);

    const {
        boardState,
        setColOfNewDisk,
        moveCounter,
        setMoveCounter,
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
                const currentGameStatus = await getBoardState(onlineGameIdRef.current);
                resolve(currentGameStatus);
            }, 500);
        });
    };

    const hasBoardStateChanged = (oldBoardState, newBoardState) => {
        let numOfDiffInBoardStates = 0;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (oldBoardState[row][col] !== newBoardState[row][col]) {
                    numOfDiffInBoardStates++;
                }
            }
        }
        if (numOfDiffInBoardStates === 0) return false;
        if (numOfDiffInBoardStates === 1) return true;
        throw new TypeError("Error: There are more one changes to the board state!");
    };

    const findColOfNewDisk = (oldBoardState, newBoardState) => {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (oldBoardState[row][col] !== newBoardState[row][col]) {
                    return col;
                }
            }
        }
    };

    useEffect(async() => {
        // runs when online mode is first enabled and for the non-active player
        if (!isOnline || isActivePlayer) return;
        let newBoardState = await getBoardState();
        while (!hasBoardStateChanged(boardState, newBoardState)) {
            newBoardState = await waitAndGetBoardState();
        }
        const colOfNewDisk = findColOfNewDisk(boardState, newBoardState);
        await setColOfNewDisk(colOfNewDisk);
        await setMoveCounter(2);
        isActivePlayerRef.current = true;
    }, [isOnline]);

    useEffect(async() => {
        if (!isOnline) return;
        const response = setBoardState();
        let newBoardState = await getBoardState();
        while (!hasBoardStateChanged(boardState, newBoardState)) {
            newBoardState = await waitAndGetBoardState();
        }
        console.log(boardState, newBoardState);
        const colOfNewDisk = findColOfNewDisk(boardState, newBoardState);
        await setColOfNewDisk(colOfNewDisk);
        await setMoveCounter(moveCounter + 1);
        isActivePlayerRef.current = true;
    }, [thisPlayerMoveCounter]);

    return <OnlineGameContext.Provider value={{
        isOnline,
        setIsOnline,
        isActivePlayerRef,
        onlineGameIdRef,
        API_URL_REF,
        thisPlayerMoveCounter,
        setThisPlayerMoveCounter
    }}> 
        {children}
    </OnlineGameContext.Provider>
};

const useOnlineGameContext = () => {
    return useContext(OnlineGameContext);
};

export {useOnlineGameContext, OnlineGameContextProvider};