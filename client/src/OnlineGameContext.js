import React, {useContext, useEffect, useRef, useState} from 'react';

const OnlineGameContext = React.createContext();

const OnlineGameContextProvider = ({children}) => {
    const [isOnline, setIsOnline] = useState(false);
    const [isActivePlayer, setIsActivePlayer] = useState(false);
    const [hasBoardStateChanged, setHasBoardStateChanged] = useState(false);

    return <OnlineGameContext.Provider value={{
        isOnline,
        setIsOnline,
        isActivePlayer,
        setIsActivePlayer,
    }}> 
        {children}
    </OnlineGameContext.Provider>
};

const useOnlineGameContext = () => {
    return useContext(OnlineGameContext);
}

export {useOnlineGameContext, OnlineGameContextProvider};