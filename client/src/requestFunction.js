import axios from "axios";

const getGameStatus = async(API_URL, gameId) => {
    try {
        const response = await axios.get(`${API_URL}/game-status`, {
            params: {
                "game_id": gameId
            }
        });
        return response.data.gameStatus;
    } catch (err) {
        console.log(err);
    }
};

const getBoardState = async(API_URL, gameId) => {
    try {
        const response = await axios.get(`${API_URL}/board-state`, {
            params: {
                "game_id": gameId
            },
        });
        return response.data.boardState;
    } catch (err) {
        console.log(err);
    }
};

const postUpdatedBoardState = async(API_URL, gameId, boardState) => {
    try {
        await axios.patch(`${API_URL}/board-state`, {
            params: {
                "game_id": gameId
            },
            data: {
                boardState
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const joinGameRequest = async(API_URL, gameId) => {
    const response = await axios.patch(
        `${API_URL}/game-status/?player_status=join&game_id=${gameId}`, 
    );
    return response;
};

const quitGameRequest = async(API_URL, gameId) => {
    const response = await axios.patch(
        `${API_URL}/game-status/?player_status=quit&game_id=${gameId}`, 
    );
    return response;
};

export {
    getGameStatus,
    getBoardState,
    postUpdatedBoardState,
    joinGameRequest,
    quitGameRequest
};